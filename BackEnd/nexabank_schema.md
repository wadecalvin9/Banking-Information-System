# NexaBank — Complete Database Schema

> Derived from exhaustive analysis of every page and component in the frontend project.

## Gap Analysis vs. Original Schema

Your original schema covered `users`, `accounts`, `transactions`, and `transfers` — which is a solid foundation. But after reading every file in the project, here's what was **missing**:

| Missing Feature | Surfaces In | What's Needed |
|---|---|---|
| **KYC verification status** | Admin → Customers page (`Verified`, `Pending`, `Rejected`) | `kyc_status` field on users |
| **Customer profile fields** | Portal → Profile (DOB, ID number, address, avatar) | Additional columns on `users` |
| **Interest rate** | Portal → Accounts page (`4.5% p.a.`) | `interest_rate` field on accounts |
| **Transaction PIN** | Portal → Transfer confirmation, Admin → Transfers (6-digit PIN) | `transaction_pin_hash` on users |
| **Transfer limits** | Portal → Transfer page, Admin → Transfers (daily/per-txn limits) | `transfer_limits` table |
| **Transfer daily usage tracking** | Portal → Transfer page (`Used today: KES 15,000`) | `daily_transfer_usage` table |
| **Session / auth tokens** | Login page (remember me, sign-out) | `sessions` table |
| **Password reset** | Login page ("Forgot password?") | `password_reset_tokens` table |
| **Account open requests** | Portal → Accounts ("Request New Account" button) | `account_requests` table |
| **Audit logging** | Admin → Transactions (audit trail), account suspend actions | `audit_logs` table |
| **Transaction description/narration** | Portal → Dashboard & Transactions (`desc` field like "Salary Credit") | Already in schema but noted |
| **Multiple transaction types** | Portal → Transactions (ATM Withdrawal, Online Purchase, Utility Bill, Interest Credit) | Expanded type enum |

---

## Complete DBML Schema

```dbml
// NexaBank - Banking Information System Schema
// Complete schema derived from frontend analysis
// https://dbml.dbdiagram.io/docs

Project NexaBank {
  database_type: 'PostgreSQL'
  Note: 'Core banking system backend schema — all features covered'
}

// ═══════════════════════════════════════════════
// ─── 1. Users & Authentication ───
// ═══════════════════════════════════════════════

Table users {
  id integer [primary key, increment]
  full_name varchar [not null]
  email varchar [unique, not null]
  password_hash varchar [not null]
  transaction_pin_hash varchar [note: 'Hashed 6-digit PIN for transfer authorization']
  phone_number varchar
  date_of_birth date [note: 'Read-only after KYC verification']
  id_number varchar [note: 'National ID or passport number, read-only after KYC']
  address text [note: 'Residential address, editable by customer']
  avatar_url varchar [note: 'Profile photo URL, defaults to initials']
  role varchar [note: "'admin' or 'customer'", default: 'customer']
  status varchar [note: "'active', 'suspended'", default: 'active']
  kyc_status varchar [note: "'Verified', 'Pending', 'Rejected'", default: 'Pending']
  created_at timestamp [default: `now()`]
  updated_at timestamp

  Note: '''
    Surfaces in:
    - Login page (email/account auth)
    - Portal → Profile (name, email, phone, DOB, ID, address)
    - Admin → Customers table (name, email, phone, KYC status)
    - Transfer flows (transaction PIN verification)
  '''
}

// ─── Authentication Sessions ───
// Supports "Keep me signed in for 30 days" checkbox
// and admin/portal sign-out flows
Table sessions {
  id integer [primary key, increment]
  user_id integer [not null]
  token varchar [unique, not null, note: 'JWT or session token']
  device_info varchar [note: 'Browser/device user agent']
  ip_address varchar
  remember_me boolean [default: false, note: 'Extended session — 30 days']
  expires_at timestamp [not null]
  created_at timestamp [default: `now()`]
}

// ─── Password Reset Tokens ───
// Supports "Forgot password?" link on login page
Table password_reset_tokens {
  id integer [primary key, increment]
  user_id integer [not null]
  token varchar [unique, not null]
  expires_at timestamp [not null]
  used boolean [default: false]
  created_at timestamp [default: `now()`]
}

// ═══════════════════════════════════════════════
// ─── 2. Bank Accounts ───
// ═══════════════════════════════════════════════

Table accounts {
  id integer [primary key, increment]
  account_number varchar [unique, not null, note: "Format: 'ACC-XXXX'"]
  user_id integer [not null]
  account_type varchar [note: "'Savings', 'Current', 'Fixed Deposit'"]
  balance decimal(15, 2) [default: 0.00]
  currency varchar [default: 'KES']
  interest_rate decimal(5, 2) [default: 0.00, note: "Annual rate, e.g. 4.50 for '4.5% p.a.'"]
  status varchar [note: "'Active', 'Dormant', 'Suspended'", default: 'Active']
  opened_at timestamp [default: `now()`]

  Note: '''
    Surfaces in:
    - Portal → Dashboard (account cards: type, balance, masked number)
    - Portal → My Accounts (balance, type, date opened, interest rate, status)
    - Admin → Accounts table (ID, owner, type, balance, opened, status)
    - Transfer forms (source account selector with balance)
    - Admin actions: View, Suspend
  '''
}

// ─── Account Open Requests ───
// Supports "Request New Account" button in Portal → Accounts
// and "+ New Account" button in Admin → Accounts
Table account_requests {
  id integer [primary key, increment]
  user_id integer [not null]
  account_type varchar [not null, note: "'Savings', 'Current', 'Fixed Deposit'"]
  status varchar [note: "'Pending', 'Approved', 'Rejected'", default: 'Pending']
  reviewed_by integer [note: 'Admin user who approved/rejected']
  notes text
  created_at timestamp [default: `now()`]
  reviewed_at timestamp
}

// ═══════════════════════════════════════════════
// ─── 3. Transactions ───
// ═══════════════════════════════════════════════

Table transactions {
  id integer [primary key, increment]
  reference_number varchar [unique, not null, note: "Format: TYPE+DATE+SEQ, e.g. 'DEP20250710001', 'TRF20250709003', 'WDR20250708005'"]
  account_id integer [not null]
  type varchar [not null, note: "'Deposit', 'Withdrawal', 'Transfer', 'Interest', 'ATM', 'Online Purchase', 'Utility Payment', 'Salary Credit'"]
  amount decimal(15, 2) [not null, note: 'Positive for credits, negative for debits']
  description varchar [note: "Narration/reference note, e.g. 'Salary Credit', 'Transfer to Brian Otieno', 'ATM Withdrawal'"]
  status varchar [note: "'Pending', 'Completed', 'Failed'", default: 'Pending']
  created_at timestamp [default: `now()`]

  Note: '''
    Surfaces in:
    - Portal → Dashboard (recent transactions: desc, amount, date, credit/debit type)
    - Portal → Transactions (full history with search, filter by account/type/date, pagination)
    - Portal → Transactions summary cards (Total Credits, Total Debits, Net Flow — this month)
    - Admin → Dashboard (recent transactions table: ID, customer, type, amount, date, status)
    - Admin → Transactions (full audit trail with search, filter, pagination, Export CSV)
    
    Transaction types observed in frontend data:
    - Deposit, Withdrawal, Transfer (original)
    - ATM Withdrawal, Online Purchase, Utility Bill Payment, 
      Salary Credit, Interest Credit, Deposit — Cash (from portal transactions)
  '''
}

// ═══════════════════════════════════════════════
// ─── 4. Transfers ───
// ═══════════════════════════════════════════════

Table transfers {
  id integer [primary key, increment]
  transaction_id integer [unique, not null, note: 'Links to parent transaction record']
  source_account_id integer [not null]
  destination_account_id integer [not null]
  description varchar [note: "Narration, e.g. 'Rent payment', 'School fees'"]
  created_at timestamp [default: `now()`]

  Note: '''
    Surfaces in:
    - Portal → Transfer (multi-step flow: from account, to account, amount, description, PIN confirm)
    - Admin → Transfers (new transfer form + recent transfers list)
    - Admin → Transfers recent list: from → to, amount, date, status
    - Transfer success screen shows reference number (from parent transaction)
  '''
}

// ─── Transfer Limits ───
// Supports the "Transfer Limits" info panel in Admin → Transfers
// and the daily limit bar in Portal → Transfer
Table transfer_limits {
  id integer [primary key, increment]
  account_type varchar [not null, note: "'Savings', 'Current', 'Fixed Deposit'"]
  daily_limit decimal(15, 2) [not null, note: 'Max total transfers per day, e.g. 500,000']
  per_transaction_limit decimal(15, 2) [not null, note: 'Max per single transfer, e.g. 200,000']
  created_at timestamp [default: `now()`]
  updated_at timestamp

  Note: '''
    Surfaces in:
    - Portal → Transfer page footer: "Daily limit: KES 500,000 · Used today: KES 15,000 · Remaining: KES 485,000"
    - Admin → Transfers sidebar: "Daily limit: KES 500,000 · Per transaction: KES 200,000 · Used today: KES 23,000"
  '''
}

// ─── Daily Transfer Usage Tracking ───
// Tracks how much a user has transferred today for limit enforcement
Table daily_transfer_usage {
  id integer [primary key, increment]
  user_id integer [not null]
  usage_date date [not null, note: 'Calendar date for tracking']
  total_transferred decimal(15, 2) [default: 0.00]

  indexes {
    (user_id, usage_date) [unique]
  }
}

// ═══════════════════════════════════════════════
// ─── 5. Audit Logs ───
// ═══════════════════════════════════════════════

// Supports "Full transaction history and audit trail" heading
// and admin actions like View, Suspend, Edit, Export CSV
Table audit_logs {
  id integer [primary key, increment]
  user_id integer [note: 'Who performed the action']
  action varchar [not null, note: "'LOGIN', 'LOGOUT', 'TRANSFER_INITIATED', 'ACCOUNT_SUSPENDED', 'PROFILE_UPDATED', 'PASSWORD_CHANGED', 'PIN_CHANGED', 'KYC_UPDATED', 'ACCOUNT_CREATED', 'CSV_EXPORTED'"]
  entity_type varchar [note: "'user', 'account', 'transaction', 'transfer'"]
  entity_id integer [note: 'ID of the affected entity']
  details text [note: 'JSON blob with action-specific details']
  ip_address varchar
  created_at timestamp [default: `now()`]

  Note: '''
    Supports:
    - Admin → Transactions page subtitle: "Full transaction history and audit trail"
    - Admin account actions: View, Suspend
    - Admin customer actions: View, Edit
    - Portal profile actions: Edit profile, Change password, Change PIN
    - Portal login/logout events
    - Admin CSV export tracking
  '''
}

// ═══════════════════════════════════════════════
// ─── Relationships ───
// ═══════════════════════════════════════════════

// Users → Accounts (one-to-many)
Ref: accounts.user_id > users.id

// Accounts → Transactions (one-to-many)
Ref: transactions.account_id > accounts.id

// Transactions → Transfers (one-to-one, optional)
Ref: transfers.transaction_id > transactions.id

// Transfers → Accounts (source and destination)
Ref: transfers.source_account_id > accounts.id
Ref: transfers.destination_account_id > accounts.id

// Sessions → Users
Ref: sessions.user_id > users.id

// Password Reset → Users
Ref: password_reset_tokens.user_id > users.id

// Account Requests → Users
Ref: account_requests.user_id > users.id
Ref: account_requests.reviewed_by > users.id

// Daily Transfer Usage → Users
Ref: daily_transfer_usage.user_id > users.id

// Audit Logs → Users
Ref: audit_logs.user_id > users.id


// ═══════════════════════════════════════════════
// ─── Sample Seed Data ───
// ═══════════════════════════════════════════════

Records users(id, full_name, email, phone_number, role, status, kyc_status, date_of_birth, id_number, address) {
  1, 'Admin User', 'admin@nexabank.com', null, 'admin', 'active', 'Verified', null, null, null
  2, 'Alice Mwangi', 'alice@email.com', '+254 712 345 678', 'customer', 'active', 'Verified', '1990-05-14', '12345678', '123 Kimathi Street, Nairobi'
  3, 'Brian Otieno', 'brian@email.com', '+254 723 456 789', 'customer', 'active', 'Verified', null, null, null
  4, 'Carol Njeri', 'carol@email.com', '+254 734 567 890', 'customer', 'active', 'Pending', null, null, null
  5, 'David Kamau', 'david@email.com', '+254 745 678 901', 'customer', 'active', 'Verified', null, null, null
  6, 'Eve Wanjiku', 'eve@email.com', '+254 756 789 012', 'customer', 'active', 'Rejected', null, null, null
  7, 'Frank Maina', 'frank@email.com', '+254 767 890 123', 'customer', 'active', 'Verified', null, null, null
}

Records accounts(id, account_number, user_id, account_type, balance, interest_rate, status, opened_at) {
  1, 'ACC-1001', 2, 'Savings', 245800.00, 4.50, 'Active', '2021-03-15'
  2, 'ACC-1002', 3, 'Current', 1200000.00, 0.00, 'Active', '2019-07-22'
  3, 'ACC-1003', 4, 'Savings', 34500.00, 4.50, 'Active', '2023-01-10'
  4, 'ACC-1004', 5, 'Fixed Deposit', 500000.00, 8.00, 'Active', '2020-11-05'
  5, 'ACC-1005', 6, 'Savings', 0.00, 4.50, 'Dormant', '2022-06-18'
  6, 'ACC-1006', 7, 'Current', 87300.00, 0.00, 'Active', '2018-09-30'
  7, 'ACC-1007', 2, 'Current', 82400.00, 0.00, 'Active', '2022-08-01'
}

Records transactions(id, reference_number, account_id, type, amount, description, status) {
  1, 'DEP20250710001', 1, 'Deposit', 45000.00, 'Salary Credit', 'Completed'
  2, 'WDR20250710002', 2, 'Withdrawal', -12500.00, 'Cash Withdrawal', 'Completed'
  3, 'TRF20250709003', 3, 'Transfer', -8000.00, 'Transfer to Frank Maina', 'Pending'
  4, 'DEP20250709004', 4, 'Deposit', 120000.00, 'Fixed Deposit Top-up', 'Completed'
  5, 'WDR20250708005', 5, 'Withdrawal', -3200.00, 'ATM Withdrawal', 'Failed'
  6, 'DEP20250708006', 6, 'Deposit', 60000.00, 'Cash Deposit', 'Completed'
  7, 'TRF20250707007', 1, 'Transfer', -15000.00, 'Transfer to Brian Otieno', 'Completed'
}

Records transfers(id, transaction_id, source_account_id, destination_account_id, description) {
  1, 3, 3, 6, 'Monthly rent'
  2, 7, 1, 2, 'Loan repayment'
}

Records transfer_limits(id, account_type, daily_limit, per_transaction_limit) {
  1, 'Savings', 500000.00, 200000.00
  2, 'Current', 500000.00, 200000.00
  3, 'Fixed Deposit', 0.00, 0.00
}
```

---

## Feature → Table Coverage Map

| Frontend Page / Feature | Tables Used |
|---|---|
| **Landing page** (login form) | `users`, `sessions` |
| **Forgot password** link | `password_reset_tokens` |
| **Portal → Dashboard** | `users`, `accounts`, `transactions` |
| **Portal → My Accounts** | `accounts` (+ `interest_rate` field) |
| **Portal → Request New Account** | `account_requests` |
| **Portal → Transactions** (history + summary) | `transactions`, `accounts` |
| **Portal → Download Statement** | `transactions`, `accounts` |
| **Portal → Transfer** (multi-step) | `transfers`, `transactions`, `accounts`, `users` (PIN), `transfer_limits`, `daily_transfer_usage` |
| **Portal → Profile** (view/edit) | `users` (all profile fields) |
| **Portal → Change Password** | `users` (password_hash), `audit_logs` |
| **Portal → Change Transaction PIN** | `users` (transaction_pin_hash), `audit_logs` |
| **Admin → Dashboard** (stats + recent txns) | `users`, `accounts`, `transactions` |
| **Admin → Accounts** (CRUD + suspend) | `accounts`, `audit_logs` |
| **Admin → Customers** (CRUD + KYC) | `users` (kyc_status), `audit_logs` |
| **Admin → Transactions** (audit trail + export) | `transactions`, `accounts`, `audit_logs` |
| **Admin → Transfers** (initiate + history) | `transfers`, `transactions`, `accounts`, `transfer_limits` |

## Key Design Decisions

1. **Transaction PIN** is stored as a separate hash on `users` (not the login password) — the frontend has distinct "Change Password" and "Change Transaction PIN" security actions.

2. **KYC status** lives on the `users` table directly — the admin customers table filters by it and shows it as a badge per customer.

3. **Interest rate** is per-account (not per-type) — the portal accounts page shows it per card, allowing for custom rates on individual accounts.

4. **Transfer limits** are per account-type — the UI shows a single set of limits, suggesting they're system-wide per category rather than per-user.

5. **`daily_transfer_usage`** is a denormalized tracking table — cheaper than `SUM()`-ing all today's transfers on every request.

6. **`account_requests`** supports the "Request New Account" CTA in the portal and the "+ New Account" action in admin.

7. **Expanded transaction types** — the frontend data uses types like "ATM Withdrawal", "Online Purchase", "Utility Bill Payment", "Salary Credit", and "Interest Credit" beyond just Deposit/Withdrawal/Transfer.
