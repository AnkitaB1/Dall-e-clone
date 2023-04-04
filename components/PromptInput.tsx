"use client";

import fetchImages from "@/lib/fetchImages";
import fetchSuggestionFromChatGPT from "@/lib/fetchSuggestionFromChatGPT";
import { FormEvent, useState } from "react";
import useSWR from 'swr';
import toast from 'react-hot-toast';

function PromptInput() {
    const [input,setInput] = useState("");
    
    const{data: suggestion, isLoading, mutate, isValidating} = useSWR('/api/suggestion', fetchSuggestionFromChatGPT, {
      revalidateOnFocus: false,
    })

    

    const { mutate: updateImages } = useSWR("images", fetchImages, {
      revalidateOnFocus: false,
    });

    //console.log(suggestion);
    const loading = isLoading || isValidating;

    const submitPrompt = async (useSuggestion?: boolean) => {
      const inputPrompt = input;
      console.log(inputPrompt);
      setInput("");
      const p = useSuggestion ? suggestion : inputPrompt;

      const notificationPrompt = p;
      const notificationPromptShort = notificationPrompt.slice(0, 20);

      const notification = toast.loading(
      `DALL·E is creating: ${notificationPromptShort}...`
    );

    
      const res = await fetch("/api/generateImage", {
         method: 'POST',
         headers: {
          'Content-Type': 'application/json'
         }, 
        body: JSON.stringify({prompt: p})
      })

      const data = await res.json();

      if (data.error) {
        toast.error(data.error);
      } else {
        toast.success(`Your AI Art has been Generated!`, {
          id: notification,
        });
      }

      updateImages();
    };

    const handleSubmit = async(e:FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        await submitPrompt();
    }

  return (
    <div className="m-10">
        <form onSubmit={e =>handleSubmit}  className="flex flex-col lg:flex-row shadow-md shadow-slate-400/10 border rounded-md lg:divide-x">
          <textarea 
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder={
            (loading && 'ChatGPT is thinking of a suggestion...')
            || suggestion ||'Put in your idea..'}
          className="flex-1 p-4"/>

          <button disabled={!input}  onClick={() => submitPrompt(false)} 
          className={`p-4 font-bold ${input ?'bg-violet-500 text-white transition-colors duration-200 border rounded-md' 
          : 'text-gray-300 cursor-not-allowed border rounded-md'
          }`}
          type="submit">Generate</button>

          <button type='button' 
          onClick={() => submitPrompt(true)} 
          className="p-4 bg-violet-400 text-white transition-colors duration-200
          font-bold disabled:text-gray-300 disabled:cursor-not-allowed disabled:bg-gray-400">
            Use Suggestion
          </button>

          <button type='button'className="p-4 bg-white text-violet-500 border-none transition-colors duration-200
          rounded-b-md md:rounded-r-md md:rounded-bl-none
           font-bold border rounded-md"
           onClick={mutate}>
            New Suggestion
            
          </button>

        </form>
        {input && (
          <p className="italic pt-2 pl-2 font-light">
            suggestion:{" "}
            <span className="text-violet-500">
              {loading ? "Chat GPTis thinking..." : suggestion}
            </span>
          </p>
        )
        
        }
    </div>
  )
}

export default PromptInput