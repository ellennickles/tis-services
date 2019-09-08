# Reference: Allison Parrish's Semantic Similarity Chatbot
# https://gist.github.com/aparrish/114dd7018134c5da80bae0a101866581
# https://github.com/aparrish/semanticsimilaritychatbot/

from flask import Flask, request, jsonify, render_template
import spacy
from semanticsimilaritychatbot import SemanticSimilarityChatbot

app = Flask(__name__)

print("loading model...")
# nlp = spacy.load('en_core_web_lg')
print("finished loading model")

print("loading chatbot...")
# chatbot = SemanticSimilarityChatbot.load('./chatbotdb/tis_lines', nlp)
print("begin chatting")

@app.route('/')
def home():
    return render_template('index.html')

@app.route('/session', methods=['POST'])
def start():
    return render_template("chatbot.html")

@app.route('/response.json')
def response():
    # sentence = request.args['sentence']
    # return jsonify({'result': chatbot.response_for(sentence)})
    return jsonify({'result': 'yep'})

if __name__ == "__main__":
    app.run()