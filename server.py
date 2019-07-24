# Reference: Allison Parrish's Semantic Similarity Chatbot
# https://gist.github.com/aparrish/114dd7018134c5da80bae0a101866581
# https://github.com/aparrish/semanticsimilaritychatbot/

from flask import Flask, request, jsonify, render_template
import spacy
from semanticsimilaritychatbot import SemanticSimilarityChatbot

app = Flask(__name__)
nlp = None
chatbot = None

# from: https://stackoverflow.com/questions/49715854/python-global-variables-not-defined
def loadTIS():
    print('loading spacy vector model...')
    global nlp
    nlp = spacy.load('en_core_web_lg')

    print("loading chatbot...")
    global chatbot
    chatbot = SemanticSimilarityChatbot.load('./chatbotdb/tis_lines', nlp)
    print("begin chatting")

@app.route('/')
def home():
    return render_template('index.html')

@app.route('/session', methods=['POST'])
def start():
    loadTIS()
    return render_template("chatbot.html")

@app.route('/response.json')
def response():
    sentence = request.args['sentence']
    return jsonify({'result': chatbot.response_for(sentence)})

if __name__ == "__main__":
    app.run()
