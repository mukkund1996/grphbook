curl https://api.openai.com/v1/chat/completions \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer $OPENAI_API_KEY" \
  -d '{
  "model": "gpt-3.5-turbo",
  "messages": [
    {
      "role": "system",
      "content": "You return only concise python code for the given prompt. Do not return anything other than the code snippet."
    },
    {
      "role": "user",
      "content": "function to sort an array of numbers using bubble sort"
    }
  ],
  "temperature": 1,
  "max_tokens": 400,
  "top_p": 1,
  "frequency_penalty": 0,
  "presence_penalty": 0
}'

# Example response
# {
#   "id": "chatcmpl-8Fp0MgCDiELqUYKj4M0oHDb009fqL",
#   "object": "chat.completion",
#   "created": 1698781674,
#   "model": "gpt-3.5-turbo-0613",
#   "choices": [
#     {
#       "index": 0,
#       "message": {
#         "role": "assistant",
#         "content": "def bubble_sort(arr):\n    n = len(arr)\n    for i in range(n):\n        for j in range(n-i-1):\n            if arr[j] > arr[j+1]:\n                arr[j], arr[j+1] = arr[j+1], arr[j]\n    return arr"
#       },
#       "finish_reason": "stop"
#     }
#   ],
#   "usage": {
#     "prompt_tokens": 42,
#     "completion_tokens": 60,
#     "total_tokens": 102
#   }
# }
