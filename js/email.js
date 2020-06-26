function getMailtoUrl(to, subject, body) {
    var args = [];
    if (typeof subject !== 'undefined') {
        args.push('subject=' + encodeURIComponent(subject));
    }
    if (typeof body !== 'undefined') {
        args.push('body=' + encodeURIComponent(body))
    }

    var url = 'mailto:' + encodeURIComponent(to);
    if (args.length > 0) {
        url += '?' + args.join('&');
    }
    return url;
}

function choice(items) {
    return items[Math.floor(Math.random() * items.length)];
}

function shuffle(items) {
    var array = [...items];
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

function choice_action(items) {
    return function() {
        return choice(items);
    };
}

function list_shuffle_and(items) {
    return function() {
        var is = shuffle(items);
        return is.slice(0,-1).join(", ").concat(", and ", is.slice(-1));
    }
}

function list_shuffle_numbered(items) {
    return function() {
        var is = shuffle(items);
        for (var i = 1; i <= is.length; i++) {
            is[i-1] = i.toString()+". "+is[i-1];
        }
        return is.join("\n");
    }
}

const EMAILS = "presidentaoun@northeastern.edu, office_of_the_president@northeastern.edu, chancellor@northeastern.edu, d.madigan@northeastern.edu, g.serra@northeastern.edu, m.french@northeastern.edu, k.henderson@northeastern.edu"

const SUBJECTS = ["{{subject_opener}}: Concerns {{ regarding }}{{ plans_for }} {{ fall_reopening }}",
"{{subject_opener}}: NU CARE demands {{ regarding }} {{ fall_reopening }}"]

const OPENING = (name, blurb) => 
`Hello,

My name is ${name}. I am writing in response to {{ northeastern }}'s fall reopening plan, to express my concern {{ regarding }} its inadequacy in providing a {{ just_safe }} opening for every single member of the Northeastern community and surrounding Boston area. 

${blurb}

Providing vague plans on {{ testing_housing }} are all scratching the surface on what Northeastern could and should be doing. If the administration really believes that “maintaining the health and wellbeing of the Northeastern community—and the world beyond our campuses” is paramount, we need you to listen and make a real commitment to the community.

I believe that the demands laid out by the Northeastern Coalition for Affordability, Responsibility and Equity (NU CARE) are key and urgent for reopening {{ in_the }} Fall without sacrificing the health and well-being of our {{ students_faculty }}: `

const DEMANDS = ["Tuition must be reduced for all classes that are impacted by a transition to online or hybrid learning, and refunds must be offered for similarly affected Summer 1 and Summer 2 classes. This refers to any class that did not previously have sections offered online, and now only has sections offered online or through NUflex. Without tuition reductions, we will see a higher number of students choosing to defer their education rather than participate in the Fall 2020 semester, even with the advantages of NUflex over a fully online model.", 
"Both incoming and returning students, including NU.in students, must be able to easily defer their enrollment or take a leave of absence for the Fall 2020 semester, and then resume their education in the Spring 2021 semester. Many students in precarious financial situations will not be making a choice between deferment and enrollment, but deferment and withdrawal from the university. Unless students are given the option to easily defer for this semester, these students may have to leave the university entirely.",
"Students who, for any reason, do not live on campus during Fall 2020 must not lose their housing guarantee. First and second-year students must also be released from their obligation to live on-campus for the Fall 2020 semester.",
"The Fall housing cancellation deadline must be extended. Students who have already registered for Fall housing should be able to cancel with no penalty.",
"Ensure that adequate PPE is available to all students, faculty, and staff - including any contractors or subcontractors. PPE is essential in reducing the spread of COVID-19 and a lack of availability on campus, due to financial, supply, or other reasons, could easily lead to an outbreak. ",
"Staff exposed to hazardous working environments (such as cleaning and dining staff) should be awarded hazard pay.",
"Any data collected through the NUPD SafeZone app must be used only for public health purposes. Pledging to use this data only for public health purposes, and not for punitive purposes or OSCCR, would help increase public trust in the SafeZone app, thus improving relations between our student body and NUPD. In the national discussion regarding the ethics and dangers of unregulated surveillance and data collection, it is important for Northeastern to take a stance as a leader in privacy and caution in this discussion.",
"Northeastern must be transparent regarding NUPD’s role in enforcing social distancing and health measures on campus as well as explicitly detailing what these are to the entire Northeastern community. I was pleased to hear through the town halls that NUPD will not be enforcing social distancing. However, there still needs to be clear transparency about how social distancing will be enforced, so that students and community members can know the rules and feel safe on-campus.",
"Northeastern must be upfront about any plans to lease additional off-campus properties for student housing and work to offset any gentrification caused by this. Northeastern coexists with the Boston communities around us and gentrification is an issue that can displace these people and businesses unfairly. Offsetting gentrification maintains relationships with Boston communities and provides good PR for Northeastern."]


const SHORT_DEMANDS = ["Tuition must be reduced for all classes that are affected by the transition to online or hybrid learning, and refunds must be offered for similarly affected Summer 1 and Summer 2 classes.", 
"Both incoming and returning students, including NU.in students, must be able to easily defer their enrollment or take a leave of absence for the Fall 2020 semester.",
"Students who, for any reason, do not live on campus during Fall 2020 must not lose their housing guarantee. First and second-year students must also be released from their obligation to live on-campus for the Fall 2020 semester.",
"The Fall housing cancellation deadline must be extended. Students who have already registered for Fall housing should be able to cancel with no penalty.",
"Ensure that adequate PPE is available to all students, faculty, and staff - including any contractors or subcontractors.",
"Staff exposed to hazardous working environments (such as cleaning and dining staff) should be awarded hazard pay.",
"Any data collected through the NUPD SafeZone app must be used only for public health purposes.",
"Northeastern must be transparent regarding NUPD’s role in enforcing social distancing and health measures on campus as well as explicitly detailing what these are to the entire Northeastern community.",
"Northeastern must be upfront about any plans to lease additional off-campus properties for student housing and work to offset any gentrification caused by this."]

const AFTER_DEMANDS = "I am personally endorsing these demands, and I am not alone. NU CARE is supported by Northeastern groups across campus who care about a range of topics such as {{ club_topics }}. Students with diverse interests on campus are coming together to say they care about equity and safety as well as the “experience” the re-opening team has emphasized. These are some of the groups who endorse NU CARE: "

const CLUBS = ["Northeastern Young Democratic Socialists of America",
"Progressive Student Alliance",
"Northeastern College Democrats ",
"Sunrise Northeastern",
"Northeastern for Biden",
"Interdisciplinary Women's Council at Northeastern University ",
"Husky Environmental Action Team ",
"Northeastern University Huskiers and Outing Club ",
"Students for Justice in Palestine ",
"Peer Health Exchange ",
"Global Medical Brigades",
"National Organization of Minority Architecture Students at Northeastern",
"American Institute of Architects - Students"]

const CLOSING = "As President Aoun has continued to stress {{ northeastern }}’s pursuit for opportunities to innovate for the future, I look forward to seeing {{ northeastern }} implement these demands and thus seize the chance to be truly innovative in our {{ covid }} response and reopening compared to universities across the country. "

const SIGNATURE = (name, position) => 
`Sincerely,
${name},
${position}`

function generateEmail(name, position, blurb) {
    var subject = Sentencer.make(choice(SUBJECTS));
    var body_raw = 
    `${OPENING(name, blurb)}
    
{{ demands }}
    
${AFTER_DEMANDS}
    
{{clubs}}
    
${CLOSING}
    
${SIGNATURE(name, position)}`

    var body = Sentencer.make(body_raw);

    return getMailtoUrl(EMAILS, subject, body);
}

var Sentencer = require('sentencer');

Sentencer.configure({
    // additional actions for the template engine to use.
    // you can also redefine the preset actions here if you need to.
    // See the "Add your own actions" section below.
    actions: {
      subject_opener: choice_action(["URGENT", "IMPORTANT", "PLEASE READ"]),
      regarding: choice_action(["about", "regarding"]),
      plans_for: choice_action([" plans for", ""]),
      fall_reopening: choice_action(["fall re-opening", "re-opening in the fall"]),
      just_safe: list_shuffle_and(["just", "safe", "conscientious"]),
      testing_housing: list_shuffle_and(["testing", "housing", "dining", "the logistics of campus life"]),
      students_faculty: list_shuffle_and(["students", "faculty", "staff", "neighboring communities"]),
      club_topics: list_shuffle_and(["health", "sports", "politics", "architecture", "climate resiliency"]),
      clubs: list_shuffle_numbered(CLUBS),
      demands: list_shuffle_numbered(SHORT_DEMANDS),
      northeastern: choice_action(["Northeastern", "the University"]),
      covid: choice_action(["COVID-19", "COVID", "Coronavirus"]),
      in_the: choice_action(["in the", "this"]),
    }
});
