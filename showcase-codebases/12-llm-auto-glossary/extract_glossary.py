import os
import glob
from openai import OpenAI

client = OpenAI()

def extract_terms(directory):
    all_text = ""
    for file in glob.glob(f"{directory}/**/*.md", recursive=True):
        with open(file, 'r') as f:
            all_text += f.read() + "\n\n"
            
    prompt = f"Extract a list of technical jargon and acronyms from the following text and provide concise definitions. Format as a Markdown table:\n\n{all_text[:10000]}"
    
    response = client.chat.completions.create(
        model="gpt-3.5-turbo",
        messages=[{"role": "user", "content": prompt}]
    )
    
    with open('GLOSSARY.md', 'w') as f:
        f.write("# Technical Glossary\n\n")
        f.write(response.choices[0].message.content)

if __name__ == '__main__':
    extract_terms('./docs')
