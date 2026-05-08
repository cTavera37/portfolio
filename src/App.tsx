import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform, AnimatePresence } from "motion/react";
import {
  FileText,
  Cpu,
  Cog,
  Layers,
  Waves,
  Activity,
  Gamepad2,
  Microscope,
  ExternalLink,
  ChevronRight,
  Download,
  Github,
  Linkedin,
  Mail,
} from "lucide-react";

// --- Types ---
interface Project {
  id: string;
  title: string;
  skills: string[];
  description: string;
  image: string;
  video?: string;
  links?: { label: string; url: string }[];
  category: "Design" | "Research" | "Controls" | "Hydrophone";
}

// --- Content Data ---
const PROJECTS: Project[] = [
  {
    id: "yoyo",
    title: "50+ Injection Molded Walkman Yo-Yos",
    skills: ["DFMA", "Process Characterization", "CAM", "Injection Molding"],
    description:
      "Successfully scaled production of Sony Walkman-inspired functional yo-yos. Engineered complex overmolds for ergonomic texture and implemented press-fit tolerances that reliably passed 4ft drop testing. Optimized toolpaths via CNC and SLA for rapid iteration and custom marbling effects.",
    image: "/assets/yoyo_group.jpg",
    category: "Design",
  },
  {
    id: "nano",
    title: "Architected Nanomaterial Optimization",
    skills: [
      "FEA",
      "CAD (SolidWorks)",
      "Optimization",
      "2-Photon Polymerization",
    ],
    description:
      "Developed the top-performing design (1st of 125) for elastic modulus per unit density in an MIT engineering competition. Utilized FEA to refine unit cell geometries and 2-photon polymerization to fabricate features down to 5 microns—on the order of a human blood cell.",
    image: "/assets/nanomaterial_cad.jpg",
    video: "/assets/nanomaterial_compression.mp4",
    category: "Research",
  },
  {
    id: "skateboard",
    title: "Dynamics of Skateboard Turning Systems",
    skills: [
      "Product Characterization",
      "Data Analysis",
      "Academic Communication",
    ],
    description:
      "Individually conducted research identifying critical correlations between bushing tightness and the viscoelastic dampening of skateboard dynamics. Findings were published and presented at the 2026 MIT Sports Summit, providing new insights into equipment performance optimization.",
    image: "/assets/skateboard_poster.jpg",
    links: [{ label: "Read Paper", url: "/assets/skateboard_paper.pdf" }],
    category: "Research",
  },
  {
    id: "swarm",
    title: "Swarm Robotics Joint & Suspension Systems",
    skills: ["Controls Engineering", "PID Control", "Rapid Prototyping"],
    description:
      "Engineered robust suspension and PID control systems for a fleet of autonomous demo robots at the University of Melbourne. Integrated high-resolution encoders and iterated mechanical suspension designs for cost-effective, rapid assembly across a scalable swarm.",
    image: "/assets/suspension_image.jpg", // Using a focused engineering shot as the hover detail
    video: "/assets/suspension_demo.mp4",
    category: "Controls",
  },
  {
    id: "painting",
    title: "Chromatic Clash: Ergonomic UI/UX",
    skills: ["UX Design", "Ergonomics", "3D Printing", "Laser Cutting"],
    description:
      "Designed a collaborative-competitive painting experience focused on physical interaction. Developed custom 3D-printed handles optimized for long-form gameplay based on ergonomic principles and user testing loops.",
    image: "/assets/painting_game_handles.jpg",
    video: "/assets/painting_game_play.mp4",
    category: "Design",
  },
];

const HYDROPHONE_PROJECTS: Project[] = [
  {
    id: "h-pcb",
    title: "Phased Array Localization PCB",
    skills: ["PCB Design", "Circuit Simulation", "Analog/Digital Conversion"],
    description:
      "Architected a custom PCB for high-frequency signal processing in underwater environments. Focused on precision signal amplification and low-noise analog-to-digital conversion for real-time phased array localization.",
    image: "/assets/array_pcb.jpg",
    category: "Hydrophone",
  },
  {
    id: "h-chassis",
    title: "Piezoelectric Sensor Chassis",
    skills: ["Marine Engineering", "FDM Iteration", "Structural Analysis"],
    description:
      "Iterated water-tight housing designs to survive high hoop-stresses while maintaining acoustic signal permeability. Optimized material volume and internal non-conductive oil submersion for reliable deep-water performance.",
    image: "/assets/chassis_cad.png",
    category: "Hydrophone",
  },
  {
    id: "h-sim",
    title: "Spatial Accuracy Simulation Suite",
    skills: ["Software Dev", "Math Modeling", "Interactive Simulation"],
    description:
      "Built a first-principles simulation tool to live-calculate angular accuracy based on array spacing and frequency. Features an interactive UI for rapid parameter testing of non-uniform linear array architectures.",
    image: "/assets/bode_plot_sliders.png",
    category: "Hydrophone",
  },
];

// --- Components ---

const Navbar = () => (
  <nav className="fixed top-0 left-0 right-0 z-50 bg-base/80 backdrop-blur-md border-b border-black/5">
    <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
      <div className="flex items-center gap-2">
        <div className="w-8 h-8 bg-accent rounded-sm flex items-center justify-center text-white font-display font-bold">
          Christian Tavera
        </div>
        <span className="font-display font-medium tracking-tight text-sm uppercase">
          Mechanical Design & Engineering
        </span>
      </div>
      <div className="hidden md:flex gap-8 text-xs font-medium uppercase tracking-widest text-secondary">
        <a href="#work" className="hover:text-accent transition-colors">
          Work
        </a>
        <a href="#research" className="hover:text-accent transition-colors">
          Research
        </a>
        <a href="#skills" className="hover:text-accent transition-colors">
          Skills
        </a>
        <a
          href="/assets/resume.pdf"
          target="_blank"
          className="flex items-center gap-1 text-accent"
        >
          <Download size={14} /> Resume
        </a>
      </div>
    </div>
  </nav>
);

const Hero = () => {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const opacitySmiling = useTransform(scrollYProgress, [0, 0.4], [1, 0]);
  const opacityFocused = useTransform(scrollYProgress, [0.3, 0.7], [0, 1]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.1]);

  return (
    <section
      ref={containerRef}
      className="relative h-[150vh] bg-base-dark overflow-hidden"
    >
      <div className="sticky top-0 h-screen flex flex-col items-center justify-center px-6 pt-20">
        <div className="relative w-72 h-96 mb-8 rounded-2xl overflow-hidden shadow-2xl bg-secondary/10 border-4 border-white/50">
          <motion.img
            style={{ opacity: opacitySmiling, scale }}
            src="/assets/hero_smiling.jpg"
            alt="Smiling at competition"
            className="absolute inset-0 w-full h-full object-cover"
          />
          <motion.img
            style={{ opacity: opacityFocused, scale }}
            src="/assets/hero_focused.jpg"
            alt="Focusing on bot"
            className="absolute inset-0 w-full h-full object-cover"
          />
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="text-center max-w-2xl"
        >
          <h1 className="text-5xl md:text-7xl mb-4 text-primary leading-tight">
            Engineering <span className="text-accent italic">Precision</span>{" "}
            into Product Design
          </h1>
          <p className="text-secondary text-lg md:text-xl font-light mb-8">
            Junior Mechanical Engineer at MIT focused on the intersection of
            manufacturing scalability, rigorous research, and human-centered
            design.
          </p>
          <div className="flex justify-center gap-4">
            <a
              href="#work"
              className="px-8 py-3 bg-primary text-white text-sm font-medium hover:bg-accent transition-all duration-300"
            >
              View Portfolio
            </a>
            <div className="flex items-center gap-4 px-4">
              <a
                href="https://www.linkedin.com/in/christian-tavera-12b79a311/"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Linkedin className="w-5 h-5 cursor-pointer hover:text-accent" />
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

interface ProjectCardProps {
  project: Project;
}

const ProjectCard = ({ project }: ProjectCardProps) => {
  const [isHovered, setIsHovered] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (!isHovered && videoRef.current) {
      videoRef.current.play().catch(() => {});
    } else if (isHovered && videoRef.current) {
      videoRef.current.pause();
    }
  }, [isHovered]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="project-card-hover group aspect-[4/5] bg-white border border-black/5 cursor-pointer"
    >
      <div className="relative w-full h-full overflow-hidden">
        {project.video ? (
          <video
            ref={videoRef}
            src={project.video}
            loop
            muted
            playsInline
            autoPlay
            className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-500 ${isHovered ? "opacity-0" : "opacity-100"}`}
          />
        ) : null}

        <img
          src={project.image}
          alt={project.title}
          className={`w-full h-full object-cover transition-all duration-700 ${project.video ? (isHovered ? "opacity-100 scale-105" : "opacity-0") : "group-hover:grayscale-0"}`}
        />
      </div>

      <div className="project-overlay">
        <span className="text-accent text-[10px] font-bold uppercase tracking-[0.2em] mb-2">
          {project.category}
        </span>
        <h3 className="text-2xl mb-4 leading-tight">{project.title}</h3>
        <p className="text-sm text-neutral-300 font-light mb-6">
          {project.description}
        </p>
        <div className="flex flex-wrap gap-2 mb-6">
          {project.skills.map((skill) => (
            <span
              key={skill}
              className="px-2 py-1 bg-white/10 text-[10px] font-medium tracking-wide border border-white/5"
            >
              {skill}
            </span>
          ))}
        </div>
        <div className="flex items-center gap-4">
          {project.links?.map((link) => (
            <a
              key={link.label}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs text-neutral-400 hover:text-white flex items-center gap-1"
            >
              <ExternalLink size={12} /> {link.label}
            </a>
          ))}
        </div>
      </div>

      <div className="absolute top-4 right-4 text-white z-10 opacity-60 group-hover:opacity-0 transition-opacity">
        {project.video ? <Activity size={18} /> : <Layers size={18} />}
      </div>
    </motion.div>
  );
};

const SkillSection = () => {
  const skills = [
    {
      title: "Manufacturing",
      icon: <Cog />,
      list: ["Injection Molding", "DFMA", "CNC Machining", "SLA/FDM"],
    },
    {
      title: "Analysis",
      icon: <Cpu />,
      list: [
        "FEA (SolidWorks)",
        "MATLAB",
        "Product Characterization",
        "Thermal/Structural",
      ],
    },
    {
      title: "Design",
      icon: <Layers />,
      list: [
        "Advanced CAD",
        "User Experience",
        "Ergonomics",
        "Rapid Iteration",
      ],
    },
    {
      title: "Robotics",
      icon: <Activity />,
      list: [
        "PID Control",
        "PCB Design",
        "Sensor Integration",
        "Embedded Systems",
      ],
    },
  ];

  return (
    <section id="skills" className="py-24 bg-white border-y border-black/5">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid md:grid-cols-4 gap-12">
          {skills.map((s, i) => (
            <motion.div
              key={s.title}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="flex flex-col"
            >
              <div className="w-10 h-10 mb-6 text-accent">{s.icon}</div>
              <h4 className="text-lg mb-4">{s.title}</h4>
              <ul className="space-y-2">
                {s.list.map((item) => (
                  <li
                    key={item}
                    className="text-secondary text-sm font-light flex items-center gap-2"
                  >
                    <div className="w-1 h-1 bg-accent/30" /> {item}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default function App() {
  return (
    <div className="min-h-screen">
      <Navbar />

      <Hero />

      <section id="work" className="py-24 px-6 max-w-7xl mx-auto">
        <div className="flex justify-between items-end mb-12">
          <div>
            <h2 className="text-4xl mb-2">Selected Projects</h2>
            <p className="text-secondary font-light">
              Commercial-grade products and high-stakes engineering challenges.
            </p>
          </div>
          <div className="hidden md:block text-xs font-bold tracking-[0.3em] uppercase text-accent/50 pb-1">
            01 — 05
          </div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {PROJECTS.map((p) => (
            <ProjectCard key={p.id} project={p} />
          ))}
        </div>
      </section>

      <SkillSection />

      <section id="research" className="py-24 px-6 bg-base-dark">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-3 gap-16">
            <div className="lg:col-span-1">
              <span className="text-accent text-[10px] font-bold uppercase tracking-[0.2em] mb-4 block">
                Case Study
              </span>
              <h2 className="text-4xl mb-6 leading-tight">
                Small-Diameter Towed Hydrophone Array
              </h2>
              <p className="text-secondary font-light text-lg mb-8 leading-relaxed">
                A multi-disciplinary effort to enable autonomous underwater
                vehicle (AUV) localization. This project involved high-pressure
                structural engineering, precision circuit design, and complex
                mathematical modeling.
              </p>
              <div className="flex gap-4">
                <div className="px-4 py-2 bg-white border border-black/5 flex items-center gap-2 text-xs font-medium">
                  <Waves size={14} className="text-accent" /> Marine Systems
                </div>
                <div className="px-4 py-2 bg-white border border-black/5 flex items-center gap-2 text-xs font-medium">
                  <Cpu size={14} className="text-accent" /> Signal Processing
                </div>
              </div>
            </div>

            <div className="lg:col-span-2 grid sm:grid-cols-2 gap-4">
              {HYDROPHONE_PROJECTS.map((p, i) => (
                <div
                  key={p.id}
                  className={`bg-white border border-black/5 hover:shadow-xl transition-all duration-500 overflow-hidden flex flex-col group ${i === 2 ? "sm:col-span-2 flex-row" : ""}`}
                >
                  <div
                    className={`relative overflow-hidden ${i === 2 ? "w-1/2 aspect-video" : "w-full aspect-[16/10]"}`}
                  >
                    <img
                      src={p.image}
                      alt={p.title}
                      className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 scale-100 group-hover:scale-105"
                    />
                  </div>
                  <div
                    className={`p-8 flex flex-col justify-center ${i === 2 ? "w-1/2" : ""}`}
                  >
                    <div className="text-accent mb-4">
                      {i === 0 ? (
                        <Cpu size={24} />
                      ) : i === 1 ? (
                        <Microscope size={24} />
                      ) : (
                        <Activity size={24} />
                      )}
                    </div>
                    <h3 className="text-xl mb-3">{p.title}</h3>
                    <p className="text-sm text-secondary font-light mb-6 leading-relaxed">
                      {p.description}
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {p.skills.map((s) => (
                        <span
                          key={s}
                          className="text-[10px] font-bold text-accent uppercase tracking-wider"
                        >
                          {s}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <footer className="bg-primary text-white py-24 px-6">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-12">
          <div>
            <div className="flex gap-6">
              <a
                href="mailto:ctavera@mit.edu"
                className="flex items-center gap-2 text-sm hover:text-accent transition-colors"
              >
                <Mail size={18} /> ctavera@mit.edu
              </a>
              <a
                href="https://www.linkedin.com/in/christian-tavera-12b79a311/"
                className="flex items-center gap-2 text-sm hover:text-accent transition-colors"
              >
                <Linkedin size={18} /> LinkedIn
              </a>
            </div>
          </div>
          <div className="flex flex-col justify-end items-start md:items-end">
            <div className="text-neutral-500 text-xs uppercase tracking-widest mb-4">
              Current Location
            </div>
            <div className="text-xl mb-12">
              Massachusetts Institute of Technology — Cambridge, MA
            </div>
            <a
              href="/assets/resume.pdf"
              className="group flex items-center gap-4 text-2xl font-display hover:text-accent transition-colors"
            >
              Download Resume{" "}
              <div className="p-3 bg-white/10 rounded-full group-hover:bg-accent transition-colors">
                <ChevronRight />
              </div>
            </a>
          </div>
        </div>
        <div className="max-w-7xl mx-auto mt-24 pt-8 border-t border-white/10 flex justify-between text-[10px] uppercase tracking-widest text-neutral-500">
          <span>© 2026 MIT Mechanical Design Portfolio</span>
          <span>Built for the Modern Engineer</span>
        </div>
      </footer>
    </div>
  );
}
