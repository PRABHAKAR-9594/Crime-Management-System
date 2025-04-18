import { useNavigate } from "react-router-dom";

export default function CrimeStatusSelectionPage() {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white pt-[130px] px-4">
      <div className="w-full max-w-3xl p-8 bg-gray-800 rounded-lg shadow-lg border border-red-500">
        <h1 className="text-3xl font-bold text-center text-red-500 mb-6">Check Your Report Status</h1>
        
        <p className="text-sm text-gray-300 mb-8 text-center">
          Select the type of report you submitted to check its current status.
        </p>

        <div className="flex flex-col sm:flex-row justify-center gap-6 mb-10">
          <button
            onClick={() => navigate("/status")}
            className="bg-red-600 hover:bg-red-700 px-6 py-3 rounded-lg text-white font-medium shadow-md w-full sm:w-auto"
          >
             Crime Status
          </button>

          <button
            onClick={() => navigate("/missingstatuspage")}
            className="bg-blue-600 hover:bg-blue-700 px-6 py-3 rounded-lg text-white font-medium shadow-md w-full sm:w-auto"
          >
            Missing Report Status
          </button>
        </div>

        <div className="bg-gray-700 p-6 rounded-lg text-gray-200">
          <h2 className="text-lg font-semibold text-red-400 mb-2">Instructions:</h2>
          <ul className="list-disc list-inside space-y-2 text-sm">
            <li>Make sure you have the correct acknowledgment number before proceeding.</li>
            <li>The acknowledgment number was provided at the time of report submission.</li>
            <li>You can only track reports that have been officially registered in the system.</li>
            <li>Contact your assigned officer for additional updates or clarification.</li>
            <li>For emergencies, please contact your local police station directly.</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
