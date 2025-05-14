import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { validateName, validatePhone } from '../utils/validators';
import { createParticipant } from '../lib/supabase';
import { generateUniqueCode } from '../utils/codeGenerator';
import { Participant } from '../types';
import QRCode from 'qrcode.react';
import toast from 'react-hot-toast';

export function RegistrationForm() {
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [errors, setErrors] = useState<{ name: string | null; phone: string | null }>({
    name: null,
    phone: null,
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [registeredParticipant, setRegisteredParticipant] = useState<Participant | null>(null);

  const validate = () => {
    const nameError = validateName(name);
    const phoneError = validatePhone(phone);
    
    setErrors({
      name: nameError,
      phone: phoneError,
    });
    
    return !nameError && !phoneError;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validate()) {
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      // Generate unique code
      const code = await generateUniqueCode(checkCodeExists);
      
      // Save to Supabase
      const participant = await createParticipant(name, phone, code);
      
      setRegisteredParticipant(participant);
      toast.success('Registration successful!');
    } catch (error) {
      console.error('Registration error:', error);
      toast.error('Registration failed. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleReset = () => {
    setRegisteredParticipant(null);
    setName('');
    setPhone('');
    navigate('/');
  };

  if (registeredParticipant) {
    const statusUrl = `${window.location.origin}/status/${registeredParticipant.code}`;
    
    return (
      <div className="md:max-w-md w-full p-6 space-y-6">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Registration Successful!</h2>
          <p className="mt-2 text-gray-600 dark:text-gray-300">
            Keep your unique code safe. It will be used for the prize draw!
          </p>
        </div>
        
        <div className="lottery-ticket p-6 transform transition-all animate-[pulse_2s_infinite]">
          <div className="text-xs uppercase tracking-wider font-semibold text-primary-600 mb-2">Your Lottery Details</div>
          <h3 className="text-xl font-bold text-gray-800 dark:text-white">{registeredParticipant.name}</h3>
          <div className="text-gray-500 dark:text-gray-400 mt-1">{registeredParticipant.phone}</div>
          
          <div className="mt-4 font-mono text-lg font-bold p-4 rounded-lg w-full text-center bg-primary-50 text-primary-800 border border-primary-200 dark:bg-primary-900 dark:text-primary-200 dark:border-primary-700">
            {registeredParticipant.code}
          </div>
          
          <div className="mt-6 flex flex-col items-center">
            <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">
              Scan this QR code to check your status and draw results
            </p>
            <div className="bg-white p-4 rounded-xl">
              <QRCode value={statusUrl} size={200} />
            </div>
          </div>
          
          <div className="absolute top-0 right-0 w-16 h-16 overflow-hidden">
            <div className="absolute transform rotate-45 bg-accent-500 text-white font-semibold text-xs py-1 right-[-35px] top-[20px] w-[170px] text-center">
              Good luck!
            </div>
          </div>
        </div>
        
        <div className="mt-6">
          <button
            onClick={handleReset}
            className="w-full btn-secondary"
          >
            Return Home
          </button>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="md:max-w-md w-full p-6 space-y-6">
      <div>
        <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
          Full Name
        </label>
        <input
          id="name"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="input"
          placeholder="Enter your full name"
          disabled={isSubmitting}
        />
        {errors.name && (
          <p className="mt-1 text-sm text-error-600">{errors.name}</p>
        )}
      </div>
      
      <div>
        <label htmlFor="phone" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
          Phone Number
        </label>
        <input
          id="phone"
          type="tel"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          className="input"
          placeholder="Enter your phone number"
          disabled={isSubmitting}
        />
        {errors.phone && (
          <p className="mt-1 text-sm text-error-600">{errors.phone}</p>
        )}
      </div>
      
      <div className="pt-4">
        <button
          type="submit"
          className="w-full btn-primary"
          disabled={isSubmitting}
        >
          {isSubmitting ? (
            <span className="inline-flex items-center">
              <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Processing...
            </span>
          ) : (
            'Register for Draw'
          )}
        </button>
      </div>
    </form>
  );
}