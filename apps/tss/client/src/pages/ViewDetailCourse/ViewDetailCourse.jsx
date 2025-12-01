import Header from "../../components/Header";
import Footer from "../../components/Footer";
import { useState } from "react";
import mockCourse from "./course.json";
import CourseBanner from "../../components/ViewDetailCourse/CourseBanner";
import TutorInfo from "../../components/ViewDetailCourse/TutorInfo";
import CourseMeta from "../../components/ViewDetailCourse/CourseMeta";
import CourseObjectives from "../../components/ViewDetailCourse/CourseObjectives";
import ActionsPanel from "../../components/ViewDetailCourse/ActionsPanel";
import UpcomingSession from "../../components/ViewDetailCourse/UpcomingSession";
import Back from "../../components/Back";
export default function ViewCourseDetail() {
  const [course] = useState(mockCourse);
  const [loading] = useState(false);

  if (loading) return <div className="mt-20 text-center">Loading...</div>;
  if (!course) return <div className="mt-20 text-center">No course found.</div>;

  return (
    <div className="min-h-screen bg-[#E8E8E8] ">
      <Header />
      <div className="max-w-6xl mx-auto px-4 mt-20">
        <Back />
      </div>
      <div className="max-w-6xl mx-auto px-4 my-4 pb-10">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* LEFT MAIN */}
          <div className="col-span-2 bg-white rounded-xl shadow-md">
            <CourseBanner />

            <div className="p-6">
              <h1 className="text-3xl font-bold mb-2">{course.title}</h1>

              <TutorInfo name={course.tutorName} department={course.department} />

              <CourseMeta course={course} />

              <h2 className="text-xl font-semibold mb-2">About Session</h2>
              <p className="text-gray-600 mb-6">{course.about}</p>

              <CourseObjectives list={course.objectives} />
            </div>
          </div>

          {/* RIGHT SIDE */}
          <div className="flex flex-col gap-6">
            <ActionsPanel onEnroll={() => alert("Enroll (mock)!")} />
            <UpcomingSession data={course.nextSession} />
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
