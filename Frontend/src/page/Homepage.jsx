import { useContext, useEffect, useState } from "react";
import { UserContext } from "../context/user.context";
import { useNavigate } from "react-router-dom";
import axios from "../config/axios";
import { FaTrash } from "react-icons/fa";
import Header from "../component/header";
import AI from "../assets/AIdeveloper.webp";

const Homepage = () => {
  const { user } = useContext(UserContext);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [projectName, setProjectName] = useState("");
  const [project, setProject] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("/projects/all")
      .then((res) => {
        setProject(res.data.projects);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const handleDelete = (projectId) => {
    axios
      .delete(`/projects/delete/${projectId}`)
      .then((res) => {
        alert("Project deleted successfully");
        setProjects(projects.filter((project) => project._id !== projectId));
      })
      .catch((err) => {
        console.log(err);
      });
  };

  function createProject(e) {
    e.preventDefault();
    axios
      .post("/projects/create", {
        name: projectName,
      })
      .then((res) => {
        setIsModalOpen(false);
        window.alert("Project created successfully!"); // Success alert
      })
      .catch((error) => {
        console.log(error);
      });
  }

  return (
    <main className="relative min-h-screen bg-black text-white scroll-auto">
      <Header />
      {/* AI-Themed Banner */}
      <section className="relative w-full h-96 mt-2  flex items-center justify-center bg-gradient-to-r from-purple-700 via-blue-500 to-purple-700 text-center shadow-lg">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-80"
          style={{ backgroundImage: `url(${AI})` }}
        ></div>
        <div className="relative z-10">
          <h1 className="text-4xl md:text-6xl font-bold text-white drop-shadow-lg">
            Revolutionizing the Future with AI
          </h1>
          <p className="text-lg md:text-xl mt-3 text-gray-300">
            Innovate, Automate, Transform
          </p>
        </div>
      </section>

      {/* Project Section */}
      <div className="p-6">
        <div className="flex flex-wrap gap-4">
          <button
            onClick={() => setIsModalOpen(true)}
            className="p-4 border border-blue-400 bg-blue-600 hover:bg-blue-700 text-white rounded-lg shadow-md transition-all"
          >
            New Project <i className="ri-add-line ml-2"></i>
          </button>

          {project.map((project) => (
            <div
              key={project._id}
              className="p-4 border border-gray-500 rounded-lg min-w-52 hover:bg-gray-900 cursor-pointer transition-all shadow-md flex justify-between items-center"
            >
              <div
                onClick={() => navigate(`/project`, { state: { project } })}
                className="flex-grow"
              >
                <h2 className="font-semibold text-lg">{project.name}</h2>
                <p className="text-sm text-gray-400">
                  Collaborators: {project.users.length}
                </p>
              </div>
              <FaTrash
                onClick={(e) => {
                  e.stopPropagation();
                  handleDelete(project._id);
                }}
                className="text-red-500 hover:text-red-700 cursor-pointer ml-4"
              />
            </div>
          ))}
        </div>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm transition-opacity duration-300">
          <div className="bg-gray-900 bg-opacity-80 p-6 rounded-xl shadow-lg w-1/3 border border-gray-700 transform scale-95 transition-all duration-300 ease-out hover:scale-100">
            <h2 className="text-2xl mb-4 text-white font-semibold">
              🚀 Create New Project
            </h2>
            <form onSubmit={createProject}>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-300">
                  Project Name
                </label>
                <input
                  onChange={(e) => setProjectName(e.target.value)}
                  value={projectName}
                  type="text"
                  className="mt-2 block w-full p-3 border border-gray-600 rounded-lg bg-gray-800 text-white focus:ring-2 focus:ring-blue-500 outline-none transition-all duration-200"
                  required
                />
              </div>
              <div className="flex justify-end gap-2">
                <button
                  type="button"
                  className="px-4 py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-600 transition-all duration-200 shadow-md"
                  onClick={() => setIsModalOpen(false)}
                >
                  ❌ Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-all duration-200 shadow-md"
                >
                  ✅ Create
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </main>
  );
};

export default Homepage;
