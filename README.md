# Thought Identification System Services

description tba

A project by [Carrie Sijia Wang](https://carriesijiawang.com/) and [Ellen Nickles](https://ellennickles.site/)

With guidance and [code](https://gist.github.com/aparrish/114dd7018134c5da80bae0a101866581) from [Allison Parrish](https://www.decontextualize.com)

---

Dear Future Carries and Ellens,

Here's some useful information to run this project on your computers. Let's break it into several parts. 

## Part 1: Gather / generate the data
We need a corpus of conversational turns for Allison's [Semantic Similarity Chatbot](https://gist.github.com/aparrish/114dd7018134c5da80bae0a101866581). 

For our project we created a spreadsheet with four columns (no headers), and the code in `tis-setup.py` relies on this structure:
   1. row number
   2. data source
   3. speaker's name
   4. speaker's line

In our project, the Killing Eve character Eve Polastri always responds on an even-numbered row. When the project is running the chatbot works, Allison writes, "as a kind of search engine. When you type something into the chat, the chatbot searches its database for the most appropriate [in our case, 'Eve'] response."

Note the total number of lines for the document and divide it by 2 to retrieve the amount of conversational turns in our corpus. E.g. If the total number is 2,860, then we have 1,430 conversational turns. In Part 3, we will update `tis-setup.py` with the number of turns.

Export the completed spreadsheet as a tab-separated values file named `lines.tsv`. We can call this file whatever we want. Just be sure to update the filename in `tis-setup.py`.

## Part 2: Set up the project environment
1. Clone this repository onto your machine.
2. In your terminal window, `cd` into the newly-cloned directory `tis-services`.
3. Create a virtual environment with `python3 -m venv venv`.
4. Activate the virtual environment with `source venv/bin/activate`.
5. Install the packages listed in the `requirements.txt`. You should be able to do this all at once, but the `en-core-web-lg==2.1.0` spaCy model throws an error and prevents me from doing this. I ran short on time to troubleshoot (suggestions welcome!), so here's a list of everything to pip install instead:
```
   pip install wheel
   pip install Flask
   pip install spacy
   python -m spacy download en_core_web_lg
   pip install simpleneighbors
   pip install https://github.com/aparrish/semanticsimilaritychatbot/archive/master.zip
```
6. Create two directories: `mkdir data` and `mkdir chatbot` 

## Part 3: Create and test the chatbot database


## Part 4: Run the project


## Extra!
What about those files, `chatbot.ini` and `wsgi.py`, you ask? At one point this project was (still is?) deployed on a Digital Ocean droplet, and those files are for that specific environment. Here are the tutorials we used, although it's the future now so no guarantee these links still work:
1. [How to Connect to Droplets with SSH](https://www.digitalocean.com/docs/droplets/how-to/connect-with-ssh/)
2. [How to Connect to your Droplet with OpenSSH](https://www.digitalocean.com/docs/droplets/how-to/connect-with-ssh/openssh/)
3. [How To Point to DigitalOcean Nameservers From Common Domain Registrars](https://www.digitalocean.com/community/tutorials/how-to-point-to-digitalocean-nameservers-from-common-domain-registrars#conclusion)
4. [How to Create DNS Records](https://www.digitalocean.com/docs/networking/dns/how-to/manage-records/)
5. [How To Install Nginx on Ubuntu 18.04](https://www.digitalocean.com/community/tutorials/how-to-install-nginx-on-ubuntu-18-04) (Parts 1-3)
6. [How To Serve Flask Applications with uWSGI and Nginx on Ubuntu 18.04](https://www.digitalocean.com/community/tutorials/how-to-serve-flask-applications-with-uswgi-and-nginx-on-ubuntu-18-04)
