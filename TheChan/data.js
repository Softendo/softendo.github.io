var defaultThreads = [
    {
        id: 1,
        title: "Opiniões sobre a Blacklist da FBS e updates!",
        author: "Anonymous",
        date: Date.now(),
        content: "Recentemente, vimos algumas reclamações sobre a blacklist do servidor.. bleh bleh.",
        comments: [
            {
                author: "Arthur",
                date: Date.now(),
                content: "Hey to you too"
            }
        ]
    },
    {
        id: 2,
        title: "Thread 2",
        author: "Anonymous",
        date: Date.now(),
        content: "Thread content 2",
        comments: [
            {
                author: "Arthur",
                date: Date.now(),
                content: "Hey to you too"
            }
        ]
    }
]

var threads = defaultThreads
if (localStorage && localStorage.getItem('threads')) {
    threads = JSON.parse(localStorage.getItem('threads'));
} else {
    threads = defaultThreads;
    localStorage.setItem('threads', JSON.stringify(defaultThreads));
}