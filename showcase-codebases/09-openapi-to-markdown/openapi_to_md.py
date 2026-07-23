import yaml
import sys
import os

def convert(spec_path, out_dir):
    with open(spec_path, 'r') as f:
        spec = yaml.safe_load(f)
    
    os.makedirs(out_dir, exist_ok=True)
    
    for path, methods in spec.get('paths', {}).items():
        for method, details in methods.items():
            filename = f"{method}-{path.replace('/', '-')}.md"
            filepath = os.path.join(out_dir, filename)
            
            with open(filepath, 'w') as out:
                out.write(f"# {details.get('summary', 'Endpoint')}\n\n")
                out.write(f"**{method.upper()}** `{path}`\n\n")
                out.write(f"{details.get('description', '')}\n\n")
                out.write("## Responses\n")
                for code, res in details.get('responses', {}).items():
                    out.write(f"- **{code}**: {res.get('description', '')}\n")

if __name__ == '__main__':
    convert(sys.argv[1], sys.argv[2])
