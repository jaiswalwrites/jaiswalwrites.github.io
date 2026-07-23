import click
import json
from openai import OpenAI
import os

client = OpenAI()

@click.command()
@click.option('--spec', help='Path to API Spec')
@click.option('--out', help='Output directory')
def generate(spec, out):
    with open(spec, 'r') as f:
        data = json.load(f)
    
    prompt = f"""Generate comprehensive API documentation in Markdown for the following spec:
    {json.dumps(data, indent=2)}
    Include an architecture section and usage examples.
    """
    
    print("Calling LLM for generation...")
    response = client.chat.completions.create(
        model="gpt-4-turbo-preview",
        messages=[{"role": "user", "content": prompt}]
    )
    
    os.makedirs(out, exist_ok=True)
    with open(os.path.join(out, 'generated_api_docs.md'), 'w') as f:
        f.write(response.choices[0].message.content)
    print("Documentation generated successfully!")

if __name__ == '__main__':
    generate()
