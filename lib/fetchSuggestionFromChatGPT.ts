const fetchSuggestionFromChatGPT =() => 
  fetch("/api/suggestion",{
    cache:'no-store'
  }).then(res => res.json());
  export async function GET(request: Request) {
    return new Response('Hello, Next.js!')
  }

export default fetchSuggestionFromChatGPT;