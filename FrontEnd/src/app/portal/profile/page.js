"use client";
import { useState } from "react";

export default function PortalProfilePage() {
  const [editing, setEditing] = useState(false);
  const [profile, setProfile] = useState({
    name: "Alice Mwangi",
    email: "alice@email.com",
    phone: "+254 712 345 678",
    address: "123 Kimathi Street, Nairobi",
    dob: "1990-05-14",
    idNumber: "12345678",
  });
  const [saved, setSaved] = useState(false);

  const handleSave = (e) => {
    e.preventDefault();
    setEditing(false);
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  const Field = ({ label, name, type = "text", disabled }) => (
    <div>
      <label className="block text-xs font-medium text-slate-500 mb-1.5 uppercase tracking-wide">{label}</label>
      <input type={type} value={profile[name]} disabled={disabled || !editing}
        onChange={(e) => setProfile({ ...profile, [name]: e.target.value })}
        className={`w-full border rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors ${
          editing && !disabled ? "border-slate-300 bg-white" : "border-slate-100 bg-slate-50 text-slate-600"
        }`} />
    </div>
  );

  return (
    <div className="space-y-6 max-w-2xl">
      <div>
        <h1 className="text-2xl font-bold text-slate-800">My Profile</h1>
        <p className="text-slate-500 text-sm mt-1">Manage your personal information</p>
      </div>

      {saved && (
        <div className="bg-green-50 border border-green-200 text-green-700 text-sm px-4 py-3 rounded-lg">
          ✓ Profile updated successfully.
        </div>
      )}

      {/* Avatar */}
      <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6 flex items-center gap-5">
        <div className="w-16 h-16 rounded-full bg-blue-600 flex items-center justify-center text-white text-2xl font-bold">A</div>
        <div>
          <p className="font-semibold text-slate-800 text-lg">{profile.name}</p>
          <p className="text-slate-500 text-sm">{profile.email}</p>
          <span className="inline-block mt-1 bg-green-100 text-green-700 text-xs font-medium px-2.5 py-0.5 rounded-full">KYC Verified</span>
        </div>
      </div>

      {/* Personal Info */}
      <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6">
        <div className="flex items-center justify-between mb-5">
          <h2 className="font-semibold text-slate-800">Personal Information</h2>
          {!editing ? (
            <button onClick={() => setEditing(true)}
              className="text-sm text-blue-600 hover:underline font-medium">Edit</button>
          ) : (
            <button onClick={() => setEditing(false)}
              className="text-sm text-slate-400 hover:text-slate-600">Cancel</button>
          )}
        </div>
        <form onSubmit={handleSave} className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Field label="Full Name" name="name" />
          <Field label="Email Address" name="email" type="email" />
          <Field label="Phone Number" name="phone" />
          <Field label="Date of Birth" name="dob" type="date" disabled />
          <Field label="ID / Passport Number" name="idNumber" disabled />
          <div className="sm:col-span-2">
            <Field label="Residential Address" name="address" />
          </div>
          {editing && (
            <div className="sm:col-span-2">
              <button type="submit"
                className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-2.5 rounded-lg transition-colors text-sm">
                Save Changes
              </button>
            </div>
          )}
        </form>
      </div>

      {/* Security */}
      <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6">
        <h2 className="font-semibold text-slate-800 mb-4">Security</h2>
        <div className="space-y-3">
          {[
            { label: "Change Password", desc: "Update your login password" },
            { label: "Change Transaction PIN", desc: "Update your 6-digit transfer PIN" },
          ].map((item) => (
            <div key={item.label} className="flex items-center justify-between p-3.5 rounded-xl bg-slate-50 border border-slate-100">
              <div>
                <p className="text-sm font-medium text-slate-700">{item.label}</p>
                <p className="text-xs text-slate-400">{item.desc}</p>
              </div>
              <button className="text-sm text-blue-600 hover:underline font-medium">Update</button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
