import React, { useState } from 'react';
import { useInView } from 'react-intersection-observer';
import { Send, Check, AlertCircle } from 'lucide-react';

function BetaForm() {
  const [formData, setFormData] = useState({
    fullname: '',
    workemail: '',
    companyname: '',
    userrole: ''
  });
  const [error, setError] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const validateEmail = (email: string) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateEmail(formData.workemail)) {
      setError('Please enter a valid email address');
      return;
    }

    try {
      const form = e.target as HTMLFormElement;
      const data = new FormData(form);
      
      const response = await fetch('/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: new URLSearchParams(data as any).toString(),
      });
      
      if (response.ok) {
        setIsSubmitted(true);
        setFormData({ fullname: '', workemail: '', companyname: '', userrole: '' });
      } else {
        throw new Error('Form submission failed');
      }
    } catch (error) {
      setError('There was a problem submitting your request. Please try again.');
    }
  };

  if (isSubmitted) {
    return (
      <section className="py-20 px-4 sm:px-6 lg:px-8 gradient-bg">
        <div className="max-w-3xl mx-auto text-center">
          <div className="bg-white rounded-2xl p-8 shadow-xl">
            <Check className="h-16 w-16 text-green-500 mx-auto mb-6" />
            <h2 className="text-2xl font-bold mb-4">Thanks for Joining!</h2>
            <p className="text-gray-600">
              We have received your demo request. You will hear from us soon!
            </p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="beta" className="py-20 px-4 sm:px-6 lg:px-8 gradient-bg">
      <div 
        ref={ref}
        className={`max-w-3xl mx-auto transition-all duration-1000 ${
          inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}
      >
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-white mb-4">Request a 45 min full agentcy demo capabilities</h2>
          <p className="text-xl text-gray-300">
            Be among the first to experience the future of agency operations
          </p>
        </div>

        <form 
          onSubmit={handleSubmit}
          className="bg-white rounded-2xl p-8 shadow-xl"
          method="POST"
          data-netlify="true"
          name="betasignup"
          netlify-honeypot="botfield"
        >
          <input type="hidden" name="form-name" value="betasignup" />
          <input type="hidden" name="botfield" />
          
          <div className="space-y-6">
            <div>
              <label htmlFor="fullname" className="block text-sm font-medium text-gray-700 mb-1">
                Full Name
              </label>
              <input
                type="text"
                id="fullname"
                name="fullname"
                value={formData.fullname}
                onChange={(e) => setFormData({ ...formData, fullname: e.target.value })}
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-black focus:border-transparent"
                required
              />
            </div>

            <div>
              <label htmlFor="workemail" className="block text-sm font-medium text-gray-700 mb-1">
                Work Email
              </label>
              <input
                type="email"
                id="workemail"
                name="workemail"
                value={formData.workemail}
                onChange={(e) => {
                  setFormData({ ...formData, workemail: e.target.value });
                  setError('');
                }}
                className={`w-full px-4 py-3 rounded-lg border ${error ? 'border-red-500' : 'border-gray-300'} focus:ring-2 focus:ring-black focus:border-transparent`}
                required
              />
              {error && (
                <p className="mt-1 text-sm text-red-500 flex items-center">
                  <AlertCircle className="h-4 w-4 mr-1" />
                  {error}
                </p>
              )}
            </div>

            <div>
              <label htmlFor="companyname" className="block text-sm font-medium text-gray-700 mb-1">
                Company Name
              </label>
              <input
                type="text"
                id="companyname"
                name="companyname"
                value={formData.companyname}
                onChange={(e) => setFormData({ ...formData, companyname: e.target.value })}
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-black focus:border-transparent"
                required
              />
            </div>

            <div>
              <label htmlFor="userrole" className="block text-sm font-medium text-gray-700 mb-1">
                Your Role
              </label>
              <input
                type="text"
                id="userrole"
                name="userrole"
                value={formData.userrole}
                onChange={(e) => setFormData({ ...formData, userrole: e.target.value })}
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-black focus:border-transparent"
                required
              />
            </div>

            <button
              type="submit"
              className="w-full flex items-center justify-center px-6 py-4 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors"
            >
              Request agentcy demo
              <Send className="ml-2 h-5 w-5" />
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}

export default BetaForm;