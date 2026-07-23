import argparse
from langchain_community.vectorstores import Chroma
from langchain_openai import OpenAIEmbeddings, ChatOpenAI
from langchain.chains import RetrievalQA

def answer_question(query):
    vectorstore = Chroma(persist_directory="./chroma_db", embedding_function=OpenAIEmbeddings())
    qa = RetrievalQA.from_chain_type(
        llm=ChatOpenAI(model="gpt-4", temperature=0),
        chain_type="stuff",
        retriever=vectorstore.as_retriever()
    )
    return qa.run(query)

if __name__ == '__main__':
    parser = argparse.ArgumentParser()
    parser.add_argument('query')
    args = parser.parse_args()
    print(answer_question(args.query))
