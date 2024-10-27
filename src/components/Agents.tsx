import React from 'react';
import { useInView } from 'react-intersection-observer';
import { 
  BarChart, 
  PieChart, 
  Users, 
  FileSpreadsheet, 
  Target,
  Lightbulb,
} from 'lucide-react';

const agents = [
  {
    icon: BarChart,
    title: 'ON-OFF Media Planning Agent',
    description: 'Optimize, maximize your media mix across channels & build flows with AI-driven insights and automated planning tools.'
  },
  {
    icon: PieChart,
    title: 'Analytics Agent',
    description: 'Build maximization and full funnel models using multi-agent patterns with >97 accuracy.'
  },
  {
    icon: Users,
    title: 'Operations Manager',
    description: 'Streamline project workflows, resource allocation, and capacity planning with intelligent automation.'
  },
  {
    icon: FileSpreadsheet,
    title: 'Account Management Agent',
    description: 'Automate project tracking, budgets, and manage SOWs with precision and efficiency.'
  },
  {
    icon: Target,
    title: 'CRM & RFM Agent',
    description: 'Enhance customer relationships with agentic AI-powered for CRM, RFM analysis and design audience journeys for growth loops.'
  },
  {
    icon: Lightbulb,
    title: 'Creative Agent',
    description: 'Generate big ideas campaign concepts and creative strategies from briefs using AI-powered ideation and market trend analysis.'
  }
];

function Agents() {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <section id="agents" className="py-20 px-4 sm:px-6 lg:px-8">
      <div 
        ref={ref}
        className={`max-w-7xl mx-auto transition-all duration-1000 ${
          inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}
      >
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4">Meet Your AI Agents</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Our specialized Agentic AI patterns based on RAG handle complex agency tasks with precision and efficiency
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {agents.map((agent, index) => (
            <div 
              key={index}
              className="agent-card p-8 rounded-2xl bg-white border border-gray-100"
            >
              <agent.icon className="agent-icon h-12 w-12 mb-6 text-black transition-transform duration-300" />
              <h3 className="text-xl font-bold mb-4">{agent.title}</h3>
              <p className="text-gray-600">{agent.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Agents;
