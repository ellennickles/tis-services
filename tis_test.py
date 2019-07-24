# Reference: Allison Parrish's Semantic Similarity Chatbot
# https://gist.github.com/aparrish/114dd7018134c5da80bae0a101866581
# https://github.com/aparrish/semanticsimilaritychatbot/

import spacy
from semanticsimilaritychatbot import SemanticSimilarityChatbot

# load the spacy vector model
print("Initializing Thought Identification System (TIS)...")
nlp = spacy.load('en_core_web_lg')
print("TIS initialization completed")
print("*** Begin Identification Session ***")

# load the chatbot database
chatbot = SemanticSimilarityChatbot.load("./chatbotdb/tis_lines", nlp)

# chat!
def TIS():

    while True:
        in_str = input(">")
        # end the chat session by typing, "end session"
        if in_str == "end session":
            print("*** Identification Session Ended ***")
            break   
        else:
            print(chatbot.response_for(in_str))

TIS()