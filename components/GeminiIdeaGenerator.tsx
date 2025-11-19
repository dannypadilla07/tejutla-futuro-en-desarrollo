import React, { useState, useContext } from 'react';
import { GoogleGenAI } from '@google/genai';
import { useTranslations } from '../hooks/useTranslations';
import { SparklesIcon } from './icons/Icons';
import { AppContext } from '../context/AppContext';

interface GeminiIdeaGeneratorProps {
  onIdeaSelected: (idea: string) => void;
}

const GeminiIdeaGenerator: React.FC<GeminiIdeaGeneratorProps> = ({ onIdeaSelected }) => {
  const t = useTranslations();
  const { language } = useContext(AppContext);
  const [topic, setTopic] = useState('');
  const [ideas, setIdeas] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleGenerate = async () => {
    if (!topic.trim()) return;
    setLoading(true);
    setError('');
    setIdeas([]);
    try {
      if (!process.env.API_KEY) {
        throw new Error("API_KEY environment variable not set");
      }
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const prompt = language === 'es'
        ? `Basado en proyectos comunitarios exitosos en pueblos pequeños, genera 3 ideas innovadoras y prácticas para "${topic}" en Tejutla, El Salvador. Mantén cada idea concisa y en una sola línea, numerada.`
        : `Based on successful community projects in small towns, generate 3 innovative and practical ideas for "${topic}" in Tejutla, El Salvador. Keep each idea concise and on a single line, numbered.`;
      
      const response = await ai.models.generateContent({
        model: "gemini-2.5-flash",
        contents: prompt,
        config: {
          tools: [{googleSearch: {}}],
        },
      });

      const text = response.text;
      const generatedIdeas = text.split('\n')
                                .map(line => line.replace(/^\d+\.\s*/, '').trim()) // Remove numbering like "1. "
                                .filter(line => line.length > 0 && line.length < 150); // Filter empty and long lines
      
      if (generatedIdeas.length === 0) {
        throw new Error("No ideas were generated.");
      }

      setIdeas(generatedIdeas);
    } catch (err) {
      console.error(err);
      setError(t.geminiPromptError);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
      <div className="flex flex-col sm:flex-row gap-2">
        <input
          type="text"
          value={topic}
          onChange={(e) => setTopic(e.target.value)}
          placeholder={t.geminiPromptInputPlaceholder}
          className="flex-grow block w-full rounded-lg border-gray-300 dark:border-gray-600 shadow-sm focus:border-primary focus:ring-primary dark:bg-slate-700 p-3"
          disabled={loading}
        />
        <button
          onClick={handleGenerate}
          disabled={loading || !topic.trim()}
          className="flex items-center justify-center gap-2 bg-accent text-secondary px-4 py-3 rounded-lg font-bold hover:bg-yellow-400 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed"
        >
          {loading ? (
            <div className="w-5 h-5 border-2 border-t-transparent border-secondary rounded-full animate-spin"></div>
          ) : (
            <SparklesIcon className="h-5 w-5" />
          )}
          <span>{loading ? t.geminiPromptLoading : t.geminiPromptButton}</span>
        </button>
      </div>

      {error && <p className="mt-4 text-sm text-red-500">{error}</p>}
      
      {ideas.length > 0 && (
        <div className="mt-6 space-y-3">
            {ideas.map((idea, index) => (
                <div key={index} className="bg-white dark:bg-slate-800 p-4 rounded-lg shadow flex items-center justify-between gap-2">
                    <p className="text-gray-700 dark:text-gray-300">{idea}</p>
                    <button 
                        onClick={() => onIdeaSelected(idea)}
                        className="text-xs bg-primary/10 text-primary dark:bg-accent/10 dark:text-accent font-semibold px-3 py-1 rounded-full hover:bg-primary/20 dark:hover:bg-accent/20 transition-colors flex-shrink-0"
                    >
                        {t.geminiPromptUseIdea}
                    </button>
                </div>
            ))}
             <p className="mt-4 text-xs text-gray-500 dark:text-gray-400 text-center">{t.geminiPromptDisclaimer}</p>
        </div>
      )}

    </div>
  );
};

export default GeminiIdeaGenerator;
