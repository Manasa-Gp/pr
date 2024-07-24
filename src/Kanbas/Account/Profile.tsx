import * as client from "./client";
import { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setCurrentUser } from "./reducer";
export default function Profile() {
  const [profile, setProfile] = useState<any>({});
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const fetchProfile = useCallback(async () => {
    try {
      const account = await client.profile();
      setProfile(account);
    } catch (err: any) {
      navigate("/Kanbas/Account/Signin");
    }
  }, [navigate]);
  const signout = async () => {
    await client.signout();
    dispatch(setCurrentUser(null));
    navigate("/Kanbas/Account/Signin");
  };
  useEffect(() => { 
    fetchProfile(); 
  }, [fetchProfile]);
  return (
    <div>
      <h1>Profile</h1>
      {profile && (
        <div>
          <input value={profile.username}  onChange={(e) => setProfile({ ...profile, username:  e.target.value })}/><br/>
          <input className="mt-2" value={profile.password}  onChange={(e) => setProfile({ ...profile, password:  e.target.value })}/><br/>
          <input className="mt-2" value={profile.firstName} onChange={(e) => setProfile({ ...profile, firstName: e.target.value })}/><br/>
          <input className="mt-2" value={profile.lastName}  onChange={(e) => setProfile({ ...profile, lastName:  e.target.value })}/><br/>
          <input className="mt-2" value={profile.dob} onChange={(e) => setProfile({ ...profile, dob: e.target.value })} type="date"/><br/>
          <input className="mt-2" value={profile.email} onChange={(e) => setProfile({ ...profile, email: e.target.value })}/><br/>
          <select className="mt-2" onChange={(e) => setProfile({ ...profile, role: e.target.value })}>
            <option value="FACULTY">FACULTY</option>      <option value="STUDENT">STUDENT</option>
          </select>
          <button onClick={signout} className="btn btn-danger w-100 mt-2">
            Sign out
          </button>
        </div>
      )}
    </div>
  );
}