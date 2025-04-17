import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from "react-router-dom";

const MissingOpenCase = () => {
  const Username = sessionStorage.getItem('UserName');
  const navigate = useNavigate();
  const [cases, setCases] = useState([]);
  const [profiles, setProfiles] = useState({});

  useEffect(() => {
    if (!Username) {
      navigate('/login');
    }
  }, [Username]);

  useEffect(() => {
    const fetchCases = async () => {
      try {
        const { data: { records = [] } } = await axios.post(
          'http://localhost:8080/dept/missingopencase',
          { officerUserName: Username }
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
      } catch (error) {
        console.error('Error fetching missing open cases:', error);
      }
    };

    fetchCases();
  }, [Username]);

  const handleCloseCase = async (ackNumber, username) => {
    try {
      await axios.post('http://localhost:8080/dept/misssingclosecase', {
        acknowledgeNumber: ackNumber
      });

      setCases(cs =>
        cs.map(c =>
          c.acknowledgeNumber === ackNumber
            ? { ...c, status: 'Closed' }
            : c
        )
      );

      const profile = profiles[username];
      if (profile?.email) {
        const subject = '🔒 Missing Person Case Closed';
        const message = `
Hello ${profile.firstName},

We wanted to inform you that the missing person case (Ack. No. ${ackNumber}) has been marked as CLOSED.

For any follow-up, feel free to reply to this email or contact us at 9594663651.

Thank you,
Your Crime Reporting Team
        `.trim();

        try {
          await axios.post('http://localhost:8080/sendGmail', {
            gmail: profile.email,
            Subject: subject,
            text: message
          });
          alert(`Case ${ackNumber} closed and email sent to ${profile.email}`);
        } catch (mailErr) {
          console.error('Email send error:', mailErr);
          alert(`Case closed, but failed to send email.`);
        }
      } else {
        alert(`Case closed. Email not available for ${username}`);
      }

    } catch (err) {
      console.error('Error closing case:', err);
      alert('Failed to close the case.');
    }
  };

  return (
    <div className="min-h-screen bg-black text-white p-6 pt-[90px]">
      <div className="max-w-5xl mx-auto space-y-6">
        <h1 className="text-4xl font-bold text-center text-red-600">Open Missing Person Cases</h1>

        {cases.length === 0 ? (
          <p className="text-gray-400 text-center">No open cases found.</p>
        ) : (
          cases.map(c => {
            const profile = profiles[c.username];
            const seenDate = new Date(c.lastSeenDetails.date).toLocaleDateString();

            return (
              <div key={c._id} className="bg-zinc-900 border border-red-600 p-4 rounded-xl shadow-md space-y-4">
                <h2 className="text-2xl font-semibold text-red-500">Case #{c._id}</h2>
                
                <p><strong>Missing Person:</strong> {c.missingPerson.fullName} (Age: {c.missingPerson.age})</p>
                <img src={c.missingPerson.photo} alt="Missing Person" className="w-40 h-40 object-cover rounded-md" />
                <p><strong>Contact:</strong> {c.missingPerson.contact}</p>
                
                <p><strong>Last Seen:</strong> {c.lastSeenDetails.location}, Pincode: {c.lastSeenDetails.pincode}</p>
                <p><strong>Date:</strong> {seenDate}</p>
                
                <p><strong>Assigned Officer:</strong> {c.assignedOfficer.Name} ({c.assignedOfficer.UserName}) - {c.assignedOfficer.contact}</p>
                <p><strong>Acknowledge Number:</strong> {c.acknowledgeNumber}</p>
                
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
                    <p><strong>Address:</strong> {profile.address?.street}, {profile.address?.city}, {profile.address?.state} - {profile.address?.postalCode}</p>
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

export default MissingOpenCase;
