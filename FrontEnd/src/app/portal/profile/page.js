"use client";
import { useState, useEffect } from "react";
import { authFetch } from "@/utils/api";

export default function PortalProfilePage() {
  const [editing, setEditing] = useState(false);
  const [profile, setProfile] = useState({
    name: "",
    email: "",
    phone: "",
    status: "",
    joined: ""
  });
  const [loading, setLoading] = useState(true);
  const [saved, setSaved] = useState(false);
  
  // PIN Update States
  const [changingPin, setChangingPin] = useState(false);
  const [newPin, setNewPin] = useState("");
  const [pinLoading, setPinLoading] = useState(false);
  const [pinMessage, setPinMessage] = useState("");

  const handlePinUpdate = async (e) => {
    e.preventDefault();
    if (newPin.length !== 6) return;
    setPinLoading(true);
    setPinMessage("");
    
    try {
      const { joined, pin, ...updateData } = profile;
      updateData.pin = newPin;

      const res = await authFetch(`http://localhost:8080/api/customers/${profile.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updateData),
      });

      if (res.ok) {
        setPinMessage("PIN updated successfully!");
        setNewPin("");
        setTimeout(() => {
          setChangingPin(false);
          setPinMessage("");
        }, 3000);
      } else {
        setPinMessage("Failed to update PIN.");
      }
    } catch (err) {
      setPinMessage("An error occurred.");
    } finally {
      setPinLoading(false);
    }
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  async function fetchProfile() {
    try {
      const res = await authFetch("http://localhost:8080/api/profile");
      console.log("Profile response status:", res.status);
      if (res.ok) {
        const data = await res.json();
        console.log("Profile data received:", data);
        setProfile(data);
      } else {
        const text = await res.text();
        console.error("Profile fetch error:", text);
      }
    } catch (err) {
      console.error("Failed to fetch profile", err);
    } finally {
      setLoading(false);
    }
  }

  const handleSave = async (e) => {
    e.preventDefault();
    // Strip pin and joined to prevent double-hashing or read-only errors
    const { pin, joined, ...updateData } = profile;

    try {
      const res = await authFetch(`http://localhost:8080/api/customers/${profile.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updateData),
      });
      if (res.ok) {
        // Update localStorage so the header reflects the new name/email
        localStorage.setItem("user", JSON.stringify({ name: profile.name, email: profile.email }));
        window.dispatchEvent(new Event("userUpdate"));
        
        setEditing(false);
        setSaved(true);
        setTimeout(() => setSaved(false), 3000);
      }
    } catch (err) {
      console.error("Failed to save profile", err);
    }
  };

  const Field = ({ label, name, type = "text", disabled }) => (
    <div>
      <label className="block text-xs font-medium text-slate-500 mb-1.5 uppercase tracking-wide">{label}</label>
      <input type={type} value={profile[name] || ""} disabled={disabled || !editing}
        onChange={(e) => setProfile({ ...profile, [name]: e.target.value })}
        className={`w-full border rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors ${
          editing && !disabled ? "border-slate-300 bg-white" : "border-slate-100 bg-slate-50 text-slate-600"
        }`} />
    </div>
  );

  if (loading) return <div className="p-8 text-center text-slate-500">Loading profile...</div>;

  return (
    <div className="space-y-6 max-w-2xl">
      <div>
        <h1 className="text-2xl font-bold text-slate-800">My Profile</h1>
        <p className="text-slate-500 text-sm mt-1">Manage your personal information</p>
      </div>

      {saved && (
        <div className="bg-green-50 border border-green-200 text-green-700 text-sm px-4 py-3 rounded-lg flex items-center gap-2">
          <CheckSVG /> Profile updated successfully.
        </div>
      )}

      {/* Avatar */}
      <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6 flex items-center gap-5">
        <div className="w-16 h-16 rounded-full bg-blue-600 flex items-center justify-center text-white text-2xl font-bold">
          {profile.name ? profile.name[0] : "U"}
        </div>
        <div>
          <p className="font-semibold text-slate-800 text-lg">{profile.name}</p>
          <p className="text-slate-500 text-sm">{profile.email}</p>
          <span className={`inline-block mt-1 text-xs font-medium px-2.5 py-0.5 rounded-full ${
            profile.status === 'Verified' ? 'bg-green-100 text-green-700' : 'bg-amber-100 text-amber-700'
          }`}>
            KYC {profile.status || 'Pending'}
          </span>
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
          <Field label="Member Since" name="joined" disabled />
          
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
        <div className="space-y-4">
          <div className="p-4 rounded-xl bg-slate-50 border border-slate-100">
            <div className="flex items-center justify-between mb-3">
              <div>
                <p className="text-sm font-medium text-slate-700">Account PIN</p>
                <p className="text-xs text-slate-400">Used for login and transaction authorization</p>
              </div>
              {!changingPin ? (
                <button onClick={() => setChangingPin(true)} className="text-sm text-blue-600 hover:underline font-medium">Change PIN</button>
              ) : (
                <button onClick={() => setChangingPin(false)} className="text-sm text-slate-400 hover:text-slate-600">Cancel</button>
              )}
            </div>
            
            {changingPin && (
              <form onSubmit={handlePinUpdate} className="flex gap-3">
                <input 
                  type="password" 
                  maxLength={6}
                  placeholder="New 6-digit PIN" 
                  value={newPin}
                  onChange={(e) => setNewPin(e.target.value.replace(/\D/g, ''))}
                  className="flex-1 border border-slate-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" 
                  required
                />
                <button type="submit" disabled={newPin.length !== 6 || pinLoading} className="bg-slate-800 hover:bg-slate-900 text-white font-medium px-4 py-2 rounded-lg text-sm transition-colors disabled:opacity-50">
                  {pinLoading ? "Saving..." : "Save PIN"}
                </button>
              </form>
            )}
            {pinMessage && (
               <p className={`text-xs mt-2 font-medium ${pinMessage.includes('success') ? 'text-green-600' : 'text-red-600'}`}>{pinMessage}</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

/* ── Inline SVG icons ── */
function CheckSVG() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="20 6 9 17 4 12" />
    </svg>
  );
}
