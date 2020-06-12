# Thought Identification System (TIS)

![demo](https://github.com/ellennickles/tis-services/blob/master/demo.jpg)

The Thought Identification System, or TIS, is the name of the technology used in the Eve Polastri Chatbot. 

Using machine learning and designed in the form of a web application, Eve Polastri Chatbot is a text-based chatting experience based on the hit BBC America show, *Killing Eve*. The goal of this project is to provide fans of the show with an opportunity to engage with one of its main characters, Eve Polastri, in the narrative space after the cliffhanger of the second season of the television show. 

In this experience, Eve, after being shot, is now in a coma at an MI6 medical facility in London. The user is put in the role of a newly hired MI6 agent and tasked to talk to Eve’s mind through a newly developed technology called the Thought Identification System. By texting back and forth with Eve, the user gets to learn more about her, and ultimately, retrieves information from her regarding Villanelle's whereabouts.

A project by [Carrie Sijia Wang](https://carriesijiawang.com/) and [Ellen Nickles](https://ellennickles.site/) as part of the AMC Project Development Studio, Summer 2019. Pesented at NYC Media Lab's [AMC Networks: Synthetic Media & The Future of Storytelling](https://www.nycmedialab.org/projects-archive/amc-networks-synthetic-media-amp-the-future-of-storytelling), September 2019.

With guidance and [code](https://gist.github.com/aparrish/114dd7018134c5da80bae0a101866581) adapted from [Allison Parrish](https://www.decontextualize.com)

---

Dear Future Carries and Ellens,

Here's some useful information to run this project on your computers. Let's break it into several parts. 

## Part 1: Gather / generate the data
We need a corpus of conversational turns to use Allison's [Semantic Similarity Chatbot](https://gist.github.com/aparrish/114dd7018134c5da80bae0a101866581). 

1. Create a spreadsheet with four columns (no headers)--the code in `tis_setup.py` relies on this structure: row number, data source, speaker's name, and speaker's line. In our project, the Killing Eve character Eve Polastri always responds on an even-numbered row. When the project is running the chatbot works, Allison writes, "as a kind of search engine. When you type something into the chat, the chatbot searches its database for the most appropriate [in our case, 'Eve'] response."

2. Note the total number of lines for the document and divide it by 2 to retrieve the amount of conversational turns in our corpus. E.g. If the total number is 2,860, then we have 1,430 conversational turns. In Part 3, we will update `tis_setup.py` with the number of turns.

3. Export the completed spreadsheet as a tab-separated values file named `lines.tsv`. We can call this file whatever we want. Just be sure to update the filename in `tis_setup.py`.

(Our data file is not stored in this repository.)

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
6. Create two directories: `mkdir data` and `mkdir chatbotdb` 

## Part 3: Create and test the chatbot database
Before any chitchat, set up the bot database and test it with these steps:
1. Move the data file, `lines.tsv`, into the `data` directory.
2. Open `tis-setup.py` and update the number of conversational turns, a variable aptly named, `numTurns`, with the amount you retrieved in Part 1. Make sure to save the file after this change!
3. Execute the file with `python tis_setup.py`. This will create and save the chatbot database into the directory `chatbotdb`. There is some code in this file to test that the chatbot is working properly, but it is commented out. It's much more fun to test the chatbot with `tis_test.py`.
4. So let's take it for whirl! Run `python tis_test.py`, and converse with the chatbot through your terminal window. Simply type `end session` when you're satisfied that the responses are indeed the ones you bundled together in Part 1.


## Part 4: Run the project
Type `python server.py`in your terminal window, and visit `http://localhost:5000/` in your browser window to start the experience.

## Extra!
What about those files, `chatbot.ini` and `wsgi.py`, you ask? At one point this project was (still is?) deployed on a Digital Ocean droplet, and those files are for that specific environment. Here are the tutorials we used, although it's the future now so no guarantee these links still work:
1. [How to Connect to Droplets with SSH](https://www.digitalocean.com/docs/droplets/how-to/connect-with-ssh/)
2. [How to Connect to your Droplet with OpenSSH](https://www.digitalocean.com/docs/droplets/how-to/connect-with-ssh/openssh/)
3. [How To Point to DigitalOcean Nameservers From Common Domain Registrars](https://www.digitalocean.com/community/tutorials/how-to-point-to-digitalocean-nameservers-from-common-domain-registrars#conclusion)
4. [How to Create DNS Records](https://www.digitalocean.com/docs/networking/dns/how-to/manage-records/)
5. [How To Install Nginx on Ubuntu 18.04](https://www.digitalocean.com/community/tutorials/how-to-install-nginx-on-ubuntu-18-04) (Parts 1-3)
6. [How To Serve Flask Applications with uWSGI and Nginx on Ubuntu 18.04](https://www.digitalocean.com/community/tutorials/how-to-serve-flask-applications-with-uswgi-and-nginx-on-ubuntu-18-04)
