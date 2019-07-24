# Reference: Allison Parrish's Semantic Similarity Chatbot
# https://gist.github.com/aparrish/114dd7018134c5da80bae0a101866581
# https://github.com/aparrish/semanticsimilaritychatbot/

import csv
import spacy
import json
import random
import numpy as np
from semanticsimilaritychatbot import SemanticSimilarityChatbot

# amount of conversational turns
numTurns = 1291

# load the spacy vector model
print("loading model...")
nlp = spacy.load('en_core_web_lg')
print("finished loading model")

# prepare the conversational data
script_lines = {}
# from: https://stackoverflow.com/questions/42358259/how-to-parse-tsv-file-with-python
with open("./data/lines.tsv") as fd:
    rd = csv.reader(fd, delimiter="\t", quotechar='"')
    for parts in rd:
        script_lines[parts[0]] = parts[3]
# print(script_lines.keys())

# from: https://stackoverflow.com/questions/21837208/check-if-a-number-is-odd-or-even-in-python
evens = []
odds = []
for k in script_lines.keys():
    if int(k) % 2 == 0:
        evens.append(k)
    else:
        odds.append(k)

# from: https://thispointer.com/python-how-to-convert-a-list-to-dictionary/
zipObj = zip(odds, evens)
responses = dict(zipObj)

# was the above file loaded and parsed correctly?
# if so, print out five random pairs of conversational turns from the corpus
# for pair in random.sample(responses.items(), 5):
#     print("A:", script_lines[pair[0]])
#     print("B:", script_lines[pair[1]])
#     print()

# get the number of dimensions / shape of the vector
def sentence_mean(nlp, s):
    if s == "":
        s = " "
    doc = nlp(s, disable=['tagger', 'parser'])
    return np.mean(np.array([w.vector for w in doc]), axis=0)
vectorShape = sentence_mean(nlp, "Is it different?").shape
# print('The number of dimensions is: ', shape)
shape = vectorShape[0]

# build the chatbot
chatbot = SemanticSimilarityChatbot(nlp, shape);
for first_id, second_id in random.sample(list(responses.items()), numTurns):
    chatbot.add_pair(script_lines[first_id], script_lines[second_id])
chatbot.build()

# test the chatbot
# print("My turn: Hello?")
# print("Chatbot response: ", chatbot.response_for("Hello?"))

# test it some more
# my_turn = "Hello?"
# chatbotResponses = 3
# print("picking from", chatbotResponses, "possible responses:")
# print(chatbot.response_for(my_turn, chatbotResponses))
# print()

# save the chatbot database
chatbot.save("./chatbotdb/tis_lines")
print("saved the chatbot database")