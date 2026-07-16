import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../configs/api";
import ResumePreview from "../components/ResumePreview";

const ResumeView = () => {
  const { resumeId } = useParams();

  const [resumeData, setResumeData] = useState(null);
  const [loading, setLoading] = useState(true);

  const loadResume = async () => {
    try {
      const { data } = await api.get("/api/resumes/public/" + resumeId);
      setResumeData(data.resume);
    } catch (error) {
      console.log(error.response?.data || error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadResume();
  }, []);

  if (loading) return <h2 className="text-center mt-10">Loading...</h2>;

  if (!resumeData)
    return <h2 className="text-center mt-10">Resume Not Found</h2>;

  return (
    <div className="min-h-screen bg-gray-100 py-8">
      <ResumePreview
        data={resumeData}
        template={resumeData.template}
        accentColor={resumeData.accent_color}
      />
    </div>
  );
};

export default ResumeView;