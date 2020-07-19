//Given the user's name, job, and quote, generate a URL which will allow the user to generate an e-mail using this name, job, and quote
function generateEmailURL(name, job, quote) {
    return `/email?name=${encodeURIComponent(name)}&job=${encodeURIComponent(job)}&quote=${encodeURIComponent(quote)}`;
}