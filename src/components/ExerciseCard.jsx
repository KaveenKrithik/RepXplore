import React, { useState, useEffect } from 'react';
// Assuming the correct imports for Google Generative AI SDK
import { GoogleGenerativeAI } from "@google/generative-ai";

// Initialize the Generative AI API
const genAI = new GoogleGenerativeAI("AIzaSyBC0c8HIruCHpIaXfn0uyrz-ODvGkIKG0U");
const model = genAI.getGenerativeModel({ model: "gemini-1.5-pro" });

export default function ExerciseCard(props) {
    const { exercise, i } = props;

    const [setsCompleted, setSetsComplete] = useState(0);
    const [generatedDescription, setGeneratedDescription] = useState(exercise.description);

    // Function to fetch generated content from the Gemini API
    const fetchGeneratedDescription = async (exerciseName) => {
        const prompt = `Explain the following on how you should perform ${exerciseName} in two simple lines within one single paragraph`;
        
        try {
            const result = await model.generateContent(prompt);
            const generatedText = await result.response.text(); // Adjust if API response format is different
            setGeneratedDescription(generatedText);
        } catch (error) {
            console.error("Error fetching description:", error);
            setGeneratedDescription(exercise.description); // Fallback to default description in case of error
        }
    };

    // Fetch the description when the component mounts or when the exercise changes
    useEffect(() => {
        fetchGeneratedDescription(exercise.name.replaceAll("_", " "));
    }, [exercise]);

    function handleSetIncrement() {
        setSetsComplete((setsCompleted + 1) % 6);
    }

    return (
        <div className='p-4 rounded-md flex flex-col gap-4 bg-slate-950 sm:flex-wrap'>
            <div className='flex flex-col sm:flex-row sm:items-center sm:flex-wrap gap-x-4'>
                <h4 className='text-3xl hidden sm:inline sm:text-4xl md:text-5xl font-semibold text-slate-400'>
                    0{i + 1}
                </h4>
                <h2 className='capitalize whitespace-nowrap truncate max-w-full text-lg sm:text-xl md:text-2xl flex-1 sm:text-center'>
                    {exercise.name.replaceAll("_", " ")}
                </h2>
                <p className='text-sm text-slate-400 capitalize'>{exercise.type}</p>
            </div>
            <div className='flex flex-col'>
                <h3 className='text-slate-400 text-sm'>Muscle Groups</h3>
                <p className='capitalize'>{exercise.muscles.join(' & ')}</p>
            </div>

            {/* Render the generated or default description */}
            <div className='flex flex-col bg-slate-950 rounded gap-2'>
                {generatedDescription.split('___').map((val, index) => (
                    <div key={index} className='text-sm'>
                        {val}
                    </div>
                ))}
            </div>

            <div className='grid grid-cols-2 sm:grid-cols-4 sm:place-items-center gap-2'>
                {['reps', 'rest', 'tempo'].map(info => {
                    return (
                        <div key={info} className='flex flex-col p-2 rounded border-[1.5px] border-solid border-slate-900 w-full'>
                            <h3 className='capitalize text-slate-400 text-sm'>{info === 'reps' ? `${exercise.unit}` : info}</h3>
                            <p className='font-medium'>{exercise[info]}</p>
                        </div>
                    );
                })}
                <button onClick={handleSetIncrement} className='flex flex-col p-2 rounded border-[1.5px] duration-200 border-solid border-blue-900 hover:border-blue-600 w-full'>
                    <h3 className='text-slate-400 text-sm capitalize'>Sets completed</h3>
                    <p className='font-medium'>{setsCompleted} / 5</p>
                </button>
            </div>
        </div>
    );
}
