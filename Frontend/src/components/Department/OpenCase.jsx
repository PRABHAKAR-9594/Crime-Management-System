import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from "react-router-dom";

const OpenCase = () => {
  const Username=sessionStorage.getItem('UserName')
  const nevigate=useNavigate()
       useEffect(()=>{
          if (!Username) {
            nevigate('/login')
          }
        },[Username]);
  const [cases, setCases] = useState([]);
  const [profiles, setProfiles] = useState({});
  const officerUserName = sessionStorage.getItem("UserName") || "";

  useEffect(() => {
    const fetchCasesAndProfiles = async () => {
      try {
        console.log("Fetching open cases…");
        const { data: { records = [] } } = await axios.post(
          'http://localhost:8080/dept/opencase',
          { officerUserName }
        );
        setCases(records);

        const usernames = Array.from(new Set(records.map(c => c.username)));
        const profilePromises = usernames.map(username =>
          axios
            .post('http://localhost:8080/profile', { username })
            .then(res => {
              const profile = res.data.response || res.data;
              return { username, profile };
            })
            .catch(err => {
              console.error(`Failed to fetch profile for ${username}:`, err);
              return { username, profile: null };
            })
        );

        const results = await Promise.all(profilePromises);
        const map = results.reduce((acc, { username, profile }) => {
          acc[username] = profile;
          return acc;
        }, {});
        setProfiles(map);
        console.log("Profiles loaded:", map);

      } catch (err) {
        console.error('Error fetching cases or profiles:', err);
      }
    };

    fetchCasesAndProfiles();
  }, [officerUserName]);

  const handleCloseCase = async (ackNumber, username) => {
    try {
      console.log(`Closing case ${ackNumber}…`);
      await axios.post(
        'http://localhost:8080/dept/closecase',
        { acknowledgeNumber: ackNumber }
      );
      setCases(cs =>
        cs.map(c =>
          c.acknowledgeNumber === ackNumber
            ? { ...c, status: 'Closed' }
            : c
        )
      );
      console.log(`Case ${ackNumber} closed on server.`);

      // Now send email
      const profile = profiles[username];
      if (profile?.email) {
        const subject = '🔒 Your case has been closed';
        const message = `
Hello ${profile.firstName},

We wanted to let you know that your case (Ack. No. ${ackNumber}) has now been marked as CLOSED.

If you have any further questions, please reply to this email or call us at 9594663651.

Thank you,
Your Crime Reporting Team
        `.trim();

        try {
          console.log(`Sending email to ${profile.email}…`);
          await axios.post(
            'http://localhost:8080/sendGmail',
            {
              gmail: profile.email,
              Subject:subject,
              text: message
            }
          );
          alert(`Case ${ackNumber} closed and notification sent to ${profile.email}.`);
          console.log('Email sent successfully.');
        } catch (mailErr) {
          console.error('Error sending email:', mailErr);
          alert(`Case ${ackNumber} closed, but failed to send email.`);
        }
      } else {
        alert(`Case ${ackNumber} closed. No email address on file for ${username}.`);
      }

    } catch (err) {
      console.error('Error closing case:', err);
      alert('Failed to close case. Please try again.');
    }
  };

  return (
    <div className="min-h-screen bg-black text-white p-6 pt-[90px]">
      <div className="max-w-5xl mx-auto space-y-6">
        <h1 className="text-4xl font-bold text-center text-red-600">
          Open Cases
        </h1>

        {cases.length === 0 ? (
          <p className="text-gray-400 text-center">No cases available.</p>
        ) : (
          cases.map(c => {
            const profile = profiles[c.username];
            return (
              <div
                key={c._id}
                className="bg-zinc-900 border border-red-600 p-4 rounded-xl shadow-md space-y-4"
              >
                <h2 className="text-2xl font-semibold text-red-500">
                  Case #{c._id}: {c.crimetype}
                </h2>
                <p><strong>Username:</strong> {c.username}</p>
                <p><strong>Description:</strong> {c.description}</p>
                <p>
                  <strong>Date/Time:</strong> {c.incidentDate} @ {c.incidentTime}
                </p>
                <p>
                  <strong>Location:</strong> {c.incidentLocation.address}, {c.incidentLocation.city}, {c.incidentLocation.state} - {c.incidentLocation.pincode}
                </p>
                <p>
                  <strong>Evidence:</strong>{' '}
                  {c.evidence.imageFile && (
                    <a href={c.evidence.imageFile} target="_blank" rel="noopener noreferrer" className="text-blue-400">Image</a>
                  )}
                  {c.evidence.videoFile && (
                    <>
                      ,{' '}
                      <a href={c.evidence.videoFile} target="_blank" rel="noopener noreferrer" className="text-blue-400">Video</a>
                    </>
                  )}
                </p>
                <p>
                  <strong>Suspect:</strong> {c.suspectDetails.name} - {c.suspectDetails.description}
                </p>
                <p><strong>Ack. No.:</strong> {c.acknowledgeNumber}</p>
                <p>
                  <strong>Assigned Officer:</strong> {c.assignedOfficer.Name} ({c.assignedOfficer.UserName}), Contact: {c.assignedOfficer.contact}
                </p>
                <p className={`text-sm ${c.status === 'Closed' ? 'text-green-400' : 'text-yellow-400'}`}>
                  <strong>Status:</strong> {c.status}
                </p>

                {profile ? (
                  <div className="text-sm text-gray-300 border-t border-gray-700 pt-4 space-y-2">
                    <h3 className="text-lg font-bold text-red-400">Reporter Profile</h3>
                    <p><strong>Username:</strong> {profile.username}</p>
                    <p><strong>Name:</strong> {profile.firstName} {profile.lastName}</p>
                    <p><strong>Email:</strong> {profile.email}</p>
                    <p><strong>Phone:</strong> {profile.phone}</p>
                    <p><strong>Aadhar:</strong> {profile.AdharNumber}</p>
                    <p>
                      <strong>Address:</strong> {profile.address.street}, {profile.address.city}, {profile.address.state} - {profile.address.postalCode}
                    </p>
                    <p><strong>Account Active:</strong> {profile.isActive ? 'Yes' : 'No'}</p>
                    <p><strong>Joined:</strong> {new Date(profile.createdAt).toLocaleString()}</p>
                  </div>
                ) : (
                  <p className="text-gray-500 text-sm border-t border-gray-700 pt-4">
                    User details not available for <strong>{c.username}</strong>.
                  </p>
                )}

                {c.status !== 'Closed' && (
                  <button
                    onClick={() => handleCloseCase(c.acknowledgeNumber, c.username)}
                    className="mt-4 bg-red-600 hover:bg-red-700 text-white font-bold px-4 py-1 rounded-xl"
                  >
                    Close Case
                  </button>
                )}
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};

export default OpenCase;
