/* Preferred Capital Partners — assistant knowledge base
   ============================================================================
   This is the assistant's training material. Everything it can say is written
   here; it does not generate claims of its own.

   Editing rules
   -------------
   1. `a` is the answer, verbatim. Keep it factual and keep the register of the
      site: measured, no persuasion, no promises the offering documents would
      have to walk back.
   2. `k` are the words a person might actually use. Include the colloquial
      forms ("cash out", "get my money back"), not just the formal term.
   3. `src` links the page where the same information is set out in full.
   4. `guard: true` marks answers that touch returns, fees or terms. The
      assistant appends the projection caveat to those automatically.
   5. Anything not covered here routes the visitor to a person. That is the
      correct behaviour for a securities site — do not add speculative answers
      to close a gap.
   ========================================================================== */
window.PCP_KB = {
  meta: {
    firm: 'Preferred Capital Partners',
    updated: '2026',
    fallback:
      'I do not have a good answer for that one. If it is about the firm’s own terms, it may simply ' +
      'not be published yet — in which case ' +
      '<a href="mailto:tslaughter@prefcapitalpartners.com">tslaughter@prefcapitalpartners.com</a> will ' +
      'get you a real answer within a business day. Or try asking it another way and I may find it.',
    caveat:
      'Targets and terms are indicative, are not guaranteed, and are qualified in all respects by the ' +
      'offering documents for each investment.',
    greeting:
      'Happy to help. Ask me anything about Preferred Capital Partners — who can invest, the ' +
      'terms, how the tax treatment works, what the risks are — or about how this kind of investing ' +
      'works in general, if the vocabulary is new. I should say up front that I am automated and not ' +
      'an adviser, so nothing here is investment, legal or tax advice.'
  },

  /* Suggested openers, shown before the first question. */
  prompts: [
    'Who can invest?',
    'What is the minimum?',
    'How does a syndication work?',
    'What is a preferred return?',
    'How is this taxed?',
    'What are the risks?'
  ],

  entries: [
    /* ---------------------------------------------------------- eligibility */
    { id: 'accredited', t: 'Eligibility',
      k: 'accredited accreditation eligibility eligible qualify qualified 506c regulation suitability participate income threshold networth',
      q: 'Who can invest?',
      a: 'You need to be an accredited investor, and it has to be verified rather than simply asserted. That ' +
         'comes from Rule 506(c) of Regulation D, which is the exemption these offerings are made under. ' +
         'Most people qualify on one of three tests: income above $200,000 individually, or $300,000 ' +
         'jointly, in each of the last two years; net worth above $1 million excluding your primary ' +
         'residence; or an active Series 7, 65 or 82 licence. If you are close to a threshold and unsure, it ' +
         'is worth raising early rather than late.',
      src: 'invest.html#eligibility', label: 'Eligibility criteria' },

    { id: 'verification', t: 'Eligibility',
      k: 'verification verify proof letter cpa attorney accountant how do i prove third party',
      q: 'How is accreditation verified?',
      a: 'A third party confirms it, not you. Usually that is a letter from your CPA or attorney, or an ' +
         'automated verification service if you would rather not involve them. Self-certification is not ' +
         'permitted under 506(c), which is why the step exists at all. It generally takes two to five days, ' +
         'and it happens after the introductory conversation and before any offering materials are released.',
      src: 'invest.html#timeline', label: 'The process' },

    { id: 'notaccredited', t: 'Eligibility',
      k: 'non-accredited unaccredited dont qualify cannot qualify retail small',
      q: 'What if I am not accredited?',
      a: 'Then these particular offerings are closed to you, and that is the law rather than a preference on ' +
         'the firm\'s part. It is worth saying plainly rather than leaving you to work it out. In the ' +
         'meantime the investor materials and the strategy are open to anyone, and neither requires ' +
         'accreditation to read.',
      src: 'strategy.html', label: 'Investment Strategy' },

    /* --------------------------------------------------------------- terms */
    { id: 'minimum', t: 'Terms',
      k: 'minimum smallest amount how much invest entry ticket size start with 50000 50k',
      q: 'What is the minimum investment?',
      a: '$100,000 per offering is typical. The figure is set in each offering\'s own documents, so it can ' +
         'move. If you are weighing a first commitment below that, say so on the introductory call rather ' +
         'than ruling yourself out.',
      src: 'invest.html#call', label: 'Investing', guard: true },

    { id: 'returns', t: 'Terms',
      k: 'target returns targets arr yield how much do i make performance projections what do you aim for',
      q: 'What returns do you target?',
      a: 'The current targets are an annualised return of 16&ndash;22%, cash-on-cash of 7&ndash;10%, an ' +
         'equity multiple of 1.8&ndash;2.2x, and a hold of three to five years. Worth being precise about ' +
         'what those are: underwriting targets, not results, and not a promise.',
      src: 'index.html', label: 'Target returns', guard: true },

    { id: 'preferred', t: 'Terms',
      k: 'preferred return pref hurdle 8% priority accrue cumulative what does preferred mean',
      q: 'What is the preferred return?',
      a: 'It means you get paid before the sponsor does. Limited partners receive their stated return first, ' +
         'and only after that does the sponsor participate in profit. If a year\'s cash flow covers the ' +
         'preferred return and nothing more, investors take all of it and the sponsor takes none. It also ' +
         'accrues when unpaid, so a shortfall in one year is made good before the sponsor participates ' +
         'later.',
      src: 'strategy.html#waterfall', label: 'Distribution waterfall', guard: true },

    { id: 'waterfall', t: 'Terms',
      k: 'waterfall split profit share 70 30 promote carry how are profits divided order of payment',
      q: 'How is profit split?',
      a: 'In order: your invested capital comes back first, then the preferred return on whatever capital is ' +
         'still outstanding, and only then a profit split with the majority going to limited partners. The ' +
         'sponsor co-invests in every offering on the same terms, so the money moves in the same direction ' +
         'for everyone. The exact splits and hurdles live in each operating agreement.',
      src: 'strategy.html#waterfall', label: 'Distribution waterfall', guard: true },

    { id: 'fees', t: 'Terms',
      k: 'fees fee cost charges expenses acquisition asset management disposition hidden what do you charge load',
      q: 'What fees do you charge?',
      a: 'Acquisition, asset management and disposition fees are set out line by line in each private ' +
         'placement memorandum, including anything paid to affiliated entities. The rule worth holding onto ' +
         'is simple: if a fee is not written into the documents, it does not exist. You will get the ' +
         'specific schedule for a live offering along with the materials.',
      src: 'strategy.html#waterfall', label: 'How you get paid', guard: true },

    { id: 'hold', t: 'Terms',
      k: 'hold period how long timeline duration years when do i get capital back exit',
      q: 'How long is the hold?',
      a: 'Three to five years is the target. Capital comes back on a sale or a refinance rather than on a ' +
         'date, which is an important distinction &mdash; the hold can run longer if selling into a weak ' +
         'market would damage the outcome. Better a patient exit than a punctual one.',
      src: 'strategy.html#criteria', label: 'Acquisition criteria', guard: true },

    /* ------------------------------------------------------- distributions */
    { id: 'distributions', t: 'Distributions',
      k: 'distribution paid payment quarterly when do i get paid income cash flow ach frequency',
      q: 'When are distributions paid?',
      a: 'Quarterly, by ACH, starting the quarter after a property stabilises under its business plan. A ' +
         'newly acquired asset in heavy renovation will have a stabilisation period first, and that is ' +
         'disclosed up front in the offering rather than discovered later.',
      src: 'invest.html#timeline', label: 'The process', guard: true },

    { id: 'pause', t: 'Distributions',
      k: 'pause paused cut reduced suspend stop distribution missed payment underperform',
      q: 'What if distributions pause?',
      a: 'Yes, and it is better to say so than to imply otherwise. If an asset needs capital &mdash; a roof, ' +
         'a wave of turnover, an insurance repricing &mdash; protecting the property comes before a ' +
         'distribution. When it happens you hear about it in that quarter\'s report, with the reason and the ' +
         'plan, not in a later summary once it has been resolved.',
      src: 'faq.html', label: 'Investor questions', guard: true },

    /* ---------------------------------------------------------------- tax */
    { id: 'k1', t: 'Tax',
      k: 'k1 k-1 tax document schedule filing when do i get my k1 march taxes paperwork',
      q: 'When do I get my K-1?',
      a: 'You get a Schedule K-1 for every tax year you held an interest, showing your share of income, ' +
         'expenses and depreciation. Delivery is targeted for 31 March. If one is going to be late, you will ' +
         'hear before you need to file rather than after.',
      src: 'faq.html', label: 'Investor questions' },

    { id: 'depreciation', t: 'Tax',
      k: 'depreciation tax benefit shelter write off cost segregation deduction paper loss taxable income',
      q: 'How does depreciation work here?',
      a: 'Property can be depreciated even while it is going up in value, which is the part most people find ' +
         'counter-intuitive. Depreciation is a non-cash expense that passes through on your K-1, so the ' +
         'taxable income reported to you is often lower than the cash you actually received. Many offerings ' +
         'accelerate it with a cost segregation study. Whether it offsets your other income is a different ' +
         'question, and it turns on the passive activity rules and your own circumstances &mdash; one for ' +
         'your CPA.',
      src: 'faq.html', label: 'Investor questions' },

    { id: 'recapture', t: 'Tax',
      k: 'recapture depreciation recapture pay it back sale taxed later deferral 25%',
      q: 'What is depreciation recapture?',
      a: 'It comes back at you on sale. Depreciation reduces your cost basis, so the portion of the gain ' +
         'attributable to it is recaptured and taxed, currently at a maximum federal rate of 25%. That makes ' +
         'it a deferral rather than an exemption, which is the part most short explanations leave out.',
      src: 'faq.html', label: 'Investor questions' },

    { id: 'ubti', t: 'Tax',
      k: 'ira 401k self directed retirement account ubti unrelated business taxable income solo roth custodian',
      q: 'Can I invest through an IRA?',
      a: 'Yes &mdash; self-directed IRAs, solo 401(k)s, revocable trusts and LLCs are all common here. One ' +
         'thing to know first: real estate held in a retirement account and financed with debt can generate ' +
         'unrelated business taxable income, or UBTI. It is worth walking through with your CPA before you ' +
         'subscribe rather than after. The paperwork with your custodian is something we work through with ' +
         'you.',
      src: 'faq.html', label: 'Investor questions' },

    { id: 'statetax', t: 'Tax',
      k: 'state tax filing another state nonresident return multiple states',
      q: 'Will I owe tax in other states?',
      a: 'Possibly, yes. Holding a partnership interest in property located in another state can create a ' +
         'filing requirement there. Which states are involved is disclosed in each offering, so your CPA can ' +
         'plan for it rather than be surprised by it.',
      src: 'faq.html', label: 'Investor questions' },

    { id: 'exchange', t: 'Tax',
      k: '1031 exchange like kind swap defer gain roll over',
      q: 'Can I use a 1031 exchange?',
      a: 'Generally not into a fund interest, no. A 1031 exchange needs a direct interest in real property, ' +
         'and a partnership interest does not qualify. Structures do vary, though, so it is worth asking ' +
         'about a specific current offering rather than assuming it either way.',
      src: 'faq.html', label: 'Investor questions' },

    /* ---------------------------------------------------- risk & liquidity */
    { id: 'liquidity', t: 'Risk',
      k: 'liquid liquidity get money out early sell withdraw redeem exit early emergency locked up',
      q: 'Can I get my money out early?',
      a: 'You cannot, and that is worth being blunt about. There is no public market for these interests and ' +
         'no redemption programme, so capital stays committed until a sale or refinance returns it. That ' +
         'illiquidity is the price of the tax treatment and the control you gain. It also means the capital ' +
         'you commit should be capital you will not need during the hold.',
      src: 'faq.html', label: 'Investor questions' },

    { id: 'risks', t: 'Risk',
      k: 'risk risks lose money downside what could go wrong safe guarantee protection worst case',
      q: 'What are the principal risks?',
      a: 'The ones that actually recur: interest rate and refinancing risk, new supply landing in a ' +
         'submarket, operating cost inflation with insurance the worst offender, illiquidity for the length ' +
         'of the hold, and execution risk on renovation and management. They are managed, not eliminated ' +
         '&mdash; there is a real difference. Private real estate can lose value, including the total loss ' +
         'of invested capital.',
      src: 'faq.html', label: 'Investor questions' },

    { id: 'underperform', t: 'Risk',
      k: 'underperform miss plan behind budget bad quarter problem trouble deal goes wrong',
      q: 'What happens if a deal underperforms?',
      a: 'You hear about it in that quarter\'s report, with the numbers and what is being done. Depending on ' +
         'how serious it is, the response might be pausing distributions, replacing the property manager, ' +
         'extending the hold, or in a bad case selling at a loss. Reserves are capitalised at acquisition ' +
         'for exactly this reason: so that a difficult two years does not have to become a permanent one.',
      src: 'faq.html', label: 'Investor questions' },

    { id: 'leverage', t: 'Risk',
      k: 'leverage debt loan ltv mortgage financing bridge floating fixed rate agency',
      q: 'How much debt do you use?',
      a: 'Typically 60&ndash;70% loan-to-value, on fixed or rate-capped agency debt with a term that ' +
         'outlasts the business plan by at least two years. What the firm avoids is short-term floating rate ' +
         'bridge debt that matures into whatever the rate environment happens to be that month. That is the ' +
         'structure that has caused most of the trouble in this asset class recently.',
      src: 'strategy.html#plan', label: 'The business plan', guard: true },

    /* ------------------------------------------------------------ strategy */
    { id: 'whatyoubuy', t: 'Strategy',
      k: 'what do you buy assets properties type criteria box target acquisition units vintage class b',
      q: 'What do you buy?',
      a: 'Value-add workforce multifamily. In practice that means communities of 50 to 150+ units built ' +
         'between 1970 and 2000, B to C&minus; class, already above 85% occupancy when we buy, with a rent ' +
         'gap of at least 12% between what is being paid in place and what renovated comparables within two ' +
         'miles are achieving. Anything outside those parameters is not underwritten, which keeps the ' +
         'conversation short.',
      src: 'strategy.html#criteria', label: 'Acquisition criteria' },

    { id: 'markets', t: 'Strategy',
      k: 'where markets cities locations geography sunbelt charlotte houston sanantonio phoenix texas arizona carolina states',
      q: 'Which markets do you invest in?',
      a: 'Four Sun Belt submarkets: Charlotte, San Antonio, Houston and Phoenix. Four is deliberate rather ' +
         'than a stage we have not grown out of &mdash; it is the number you can walk regularly. Market ' +
         'selection is reviewed annually, and the firm would rather exit a market entirely than force a deal ' +
         'to justify staying in it.',
      src: 'strategy.html#markets', label: 'Target markets' },

    { id: 'businessplan', t: 'Strategy',
      k: 'business plan value add how do you make money renovate strategy approach five stages',
      q: 'What is the business plan?',
      a: 'Five stages, and the same five on every asset. Acquire below replacement cost. Renovate units as ' +
         'they turn over, rather than displacing people who live there. Professionalise the operations. ' +
         'Recover expenses through utility billback and ancillary income. Then refinance or sell once income ' +
         'is stabilised at the new level.',
      src: 'strategy.html#plan', label: 'The business plan' },

    { id: 'whymultifamily', t: 'Strategy',
      k: 'why multifamily apartments why real estate inflation hedge uncorrelated diversification stock market',
      q: 'Why multifamily?',
      a: 'It comes down to how quickly the income reprices. Apartment leases turn over annually, so the ' +
         'income stream carries roughly a year of duration against a bond\'s ten or an office lease\'s ' +
         'fifteen. Pair that with long-term fixed-rate debt and rents can adjust while the mortgage payment ' +
         'does not. Values follow property income rather than equity market sentiment, and that is what ' +
         'gives the allocation its diversifying role.',
      src: 'faq.html', label: 'Investor questions' },

    { id: 'wontdo', t: 'Strategy',
      k: 'dont avoid never wont refuse exclude exclusions restrictions development ground up construction speculative bridge',
      q: 'What will you not invest in?',
      a: 'A short list, and it is short on purpose. No short-term floating-rate debt. No ground-up ' +
         'development or lease-up risk. No rent assumption that is not already supported by a comparable ' +
         'unit leasing at that number within two miles. And no fee structure that pays the sponsor before ' +
         'the preferred return.',
      src: 'strategy.html', label: 'Investment Strategy' },

    /* ----------------------------------------------------------- operations */
    { id: 'reporting', t: 'Operations',
      k: 'reporting reports updates communication transparency what do i receive quarterly statement',
      q: 'What reporting will I receive?',
      a: 'A quarterly report for each property or fund: the operating statement, occupancy, renovation ' +
         'progress, variance against budget, and a plain-language note on what changed &mdash; including ' +
         'what missed. Annual financial statements and your K-1 come on top of that. The note on what missed ' +
         'is the part that matters; anyone can report a good quarter.',
      src: 'faq.html', label: 'Investor questions' },

    { id: 'portal', t: 'Operations',
      k: 'portal login sign in account access dashboard statements documents',
      q: 'How do I get my documents?',
      a: 'Quarterly reports, distribution history, tax documents and current offering materials are issued ' +
         'to investors directly. Your capital account is maintained by the fund administrator, independently ' +
         'of the people running the properties, which is the point of separating the two. If you need a copy ' +
         'of anything, write to tslaughter@prefcapitalpartners.com.',
      src: 'contact.html', label: 'Contact Us' },

    { id: 'coinvest', t: 'Operations',
      k: 'co-invest skin in the game own money alignment does the sponsor invest',
      q: 'Does the sponsor invest too?',
      a: 'Yes, in every offering the firm sponsors, and on the same terms as everyone else. The practical ' +
         'test of that is what happens in a bad quarter: when a distribution is reduced, it is reduced for ' +
         'the sponsor at the same time and in the same proportion.',
      src: 'about.html', label: 'About the firm' },

    { id: 'process', t: 'Operations',
      k: 'process steps start started starting begin beginning onboard onboarding timeline subscribe subscription sign wire nextstep',
      q: 'What does the process look like?',
      a: 'Four steps, and none of them are rushed. An introductory conversation first. Then third-party ' +
         'accreditation and access to materials, usually two to five days. Then your own review of the ' +
         'memorandum, the model and the operating agreement with your advisers &mdash; typically one to ' +
         'three weeks &mdash; with subscription completed electronically. After that, quarterly ' +
         'distributions and reporting once the asset is producing under plan.',
      src: 'invest.html#timeline', label: 'The process' },

    { id: 'entity', t: 'Operations',
      k: 'entity llc trust joint spouse partnership invest through name title',
      q: 'Can I invest through an entity?',
      a: 'Personally, or through an LLC, a revocable trust, a self-directed IRA or a solo 401(k) &mdash; the ' +
         'subscription documents accommodate each. The one thing that helps is telling us the intended ' +
         'holder on the introductory call, so the paperwork is drawn up correctly the first time.',
      src: 'faq.html', label: 'Investor questions' },

    /* ---------------------------------------------------------------- firm */
    { id: 'firm', t: 'The firm',
      k: 'who are you about firm company background history team leadership managing partner terrence',
      q: 'Who runs the firm?',
      a: 'Preferred Capital Partners acquires and operates multifamily assets in the Sun Belt on behalf of ' +
         'accredited investors. Fund administration, audit, tax, securities counsel and property management ' +
         'all sit with dedicated third parties rather than in-house. That is deliberate: it means your ' +
         'records are not maintained solely by the people managing the buildings.',
      src: 'about.html', label: 'About the firm' },

    { id: 'trackrecord', t: 'The firm',
      k: 'track record past performance history results previous deals realised exits case study experience',
      q: 'What is your track record?',
      a: 'A fair question, and the honest answer has two halves. The managing partner spent 15 years in ' +
         'corporate financial planning and analysis before moving into multifamily, so the underwriting ' +
         'discipline is long-standing &mdash; but the firm itself is early. Rather than point you at a ' +
         'summary, ask for the specifics directly and you will get them in writing: ' +
         'tslaughter@prefcapitalpartners.com.',
      src: 'about.html', label: 'About the firm', guard: true },

    { id: 'contact', t: 'Contact',
      k: 'contact speak call talk human email phone reach someone person introduction meeting',
      q: 'How do I speak to someone?',
      a: 'The quickest route is email &mdash; <a ' +
         'href="mailto:tslaughter@prefcapitalpartners.com">tslaughter@prefcapitalpartners.com</a> &mdash; or ' +
         '<a href="invest.html">request an introduction</a> and you will have a reply within one business ' +
         'day. Introductory conversations are held by the managing partner, not passed to someone else.',
      src: 'contact.html', label: 'Contact' },

    { id: 'broker', t: 'Contact',
      k: 'broker brokerage deal deals dealflow selling sell listing agent submit opportunity acquisitions pipeline',
      q: 'I have a deal to send you',
      a: 'Please do send it. Multifamily opportunities in our markets go to <a ' +
         'href="mailto:tslaughter@prefcapitalpartners.com">tslaughter@prefcapitalpartners.com</a>. The ' +
         'acquisition criteria are published in full so you can screen against them first and save yourself ' +
         'the round trip.',
      src: 'strategy.html#criteria', label: 'Acquisition criteria' },

    /* -------------------------------------------------------------- limits */
    { id: 'advice', t: 'Limits',
      k: 'should i invest is this good for me recommend advice advise what would you do worth it',
      q: 'Should I invest?',
      a: 'I have to stop short of that one, and so does the firm. Preferred Capital Partners is not a ' +
         'registered investment adviser, and nothing here is investment, legal or tax advice. Whether this ' +
         'suits your circumstances is genuinely a question for your own advisers, working from the offering ' +
         'documents rather than from a website. What I can do is explain how any of it works.',
      src: 'faq.html', label: 'Investor questions' },

    { id: 'guarantee', t: 'Limits',
      k: 'guarantee guaranteed promise sure thing safe cant lose principal protected insured',
      q: 'Is any of this guaranteed?',
      a: 'No, and I would be wary of anyone who said otherwise. Targets are projections built on ' +
         'underwriting assumptions, and assumptions can be wrong. Private real estate can lose value, up to ' +
         'and including the total loss of invested capital. A sponsor describing a fixed return on a private ' +
         'real estate deal is describing something they are not in a position to promise.',
      src: 'faq.html', label: 'Investor questions' },

    /* ======================================================================
       GENERAL EDUCATION
       ----------------------------------------------------------------------
       These describe how this asset class works generally, not what this firm
       does. They exist so the assistant can teach a first-time private-market
       investor the vocabulary without implying any of it is a term of a
       Preferred Capital Partners offering.

       Rule for this block: never state a number as though it were the firm's.
       The firm-specific entries above are the authority on what the firm
       actually does; these explain the concept around them.
       ====================================================================== */

    { id: 'g-syndication', t: 'How it works',
      k: 'syndication syndicate what is a syndication how does it work structure gp lp sponsor group deal joint venture',
      q: 'How does a syndication work?',
      a: 'It is a group of investors buying one property, or a portfolio, through a single entity &mdash; ' +
         'usually a limited partnership or an LLC. The sponsor, or general partner, finds the asset, ' +
         'arranges the debt and runs the business plan. Limited partners put in capital, hold a passive ' +
         'ownership interest, and carry no management role and no liability beyond what they invested. In ' +
         'short, it is a way to own institutional-scale real estate without operating it.',
      src: 'strategy.html', label: 'Investment Strategy' },

    { id: 'g-gplp', t: 'How it works',
      k: 'general partner limited partner difference what is a sponsor who runs it control decisions vote say',
      q: 'What is a GP versus an LP?',
      a: 'The general partner decides and carries the liability &mdash; acquisition, financing, renovation, ' +
         'management, and when to sell. Limited partners provide the capital and take their share of the ' +
         'cash flow and proceeds, but do not vote on how the property is run. That passivity is not ' +
         'incidental: it is what keeps the interest passive for tax purposes and caps liability at the ' +
         'amount invested.',
      src: 'strategy.html', label: 'Investment Strategy' },

    { id: 'g-caprate', t: 'How it works',
      k: 'cap rate capitalisation capitalization rate noi net operating income valuation how are properties valued worth',
      q: 'What is a cap rate?',
      a: 'Net operating income divided by price &mdash; the yardstick for pricing income property. At a 5% ' +
         'cap rate, a building throwing off $500,000 a year is worth roughly $10 million. Two things follow ' +
         'from that, and they cut both ways. Raise the income and you raise value by a multiple of the ' +
         'increase. But cap rates expanding, which usually happens alongside rates rising, cuts value even ' +
         'when the income has not moved at all.',
      src: 'strategy.html#plan', label: 'The business plan' },

    { id: 'g-valueadd', t: 'How it works',
      k: 'value add core opportunistic strategies types of real estate strategy risk spectrum stabilised',
      q: 'What does value-add mean?',
      a: 'It sits in the middle of the risk spectrum. Core is stabilised, well-located property bought for ' +
         'its income. Value-add buys something with a fixable problem &mdash; tired units, weak management, ' +
         'rents below the market &mdash; and improves the income during the hold. Opportunistic is ' +
         'development and distress, with the widest range of outcomes. The thing to understand about ' +
         'value-add is that it carries execution risk core does not: the return depends on work actually ' +
         'getting done.',
      src: 'strategy.html#plan', label: 'The business plan' },

    { id: 'g-capitalcall', t: 'How it works',
      k: 'capital call additional capital more money asked to contribute again dilution shortfall top up',
      q: 'What is a capital call?',
      a: 'A request for more capital after you have already invested, usually because a business plan has ' +
         'run over or the debt terms have shifted. Whether one is even possible, and what happens if you ' +
         'decline &mdash; commonly dilution of the non-participating interest &mdash; is set out in the ' +
         'operating agreement. It is one of the clauses most worth reading before you commit rather than ' +
         'after.',
      src: 'faq.html', label: 'Investor questions' },

    { id: 'g-k1', t: 'Tax',
      k: 'k-1 k1 schedule what is a k-1 tax form filing extension when do i get my taxes partnership return 1099',
      q: 'What is a Schedule K-1?',
      a: 'It reports your share of a partnership\'s income, deductions and credits, and it takes the place ' +
         'of the 1099 you would get from a public investment. The partnership has to close its own books ' +
         'before it can issue yours, which is why K-1s tend to arrive later than other tax documents &mdash; ' +
         'filing an extension is common in this asset class. Your accountant uses it to report the ' +
         'investment on your personal return.',
      src: 'faq.html', label: 'Investor questions' },

    { id: 'g-passive', t: 'Tax',
      k: 'passive loss activity rules offset my income can i deduct real estate professional suspended losses w2',
      q: 'Can this offset my salary?',
      a: 'Usually not against your salary, no. Depreciation from a passive real estate interest generally ' +
         'offsets passive income rather than wages or portfolio income. What you cannot use is typically ' +
         'suspended and carried forward, and often becomes usable when the property is sold. Real estate ' +
         'professional status and short-term rental treatment are the well-known exceptions, and both have ' +
         'strict tests. How any of it lands for you is a question for your CPA rather than for me.',
      src: 'faq.html', label: 'Investor questions' },

    { id: 'g-costseg', t: 'Tax',
      k: 'cost segregation seg bonus depreciation accelerate accelerated study components 27.5',
      q: 'What is cost segregation?',
      a: 'It breaks a building into components with shorter depreciable lives &mdash; fixtures, flooring, ' +
         'land improvements &mdash; so more of the depreciation lands in the early years instead of ' +
         'spreading evenly across 27.5. Bonus depreciation rules govern how much can be taken immediately. ' +
         'Worth keeping in mind that it accelerates the deduction rather than increasing it, and it raises ' +
         'the amount recaptured later on sale.',
      src: 'faq.html', label: 'Investor questions' },

    { id: 'g-debt', t: 'How it works',
      k: 'agency debt fannie freddie bridge loan fixed floating rate cap interest only amortisation mortgage financing',
      q: 'What kind of debt is used?',
      a: 'Two common routes. Agency debt from Fannie Mae or Freddie Mac, which is long-term and usually ' +
         'fixed. Or shorter bridge debt while a property is being repositioned, often floating and paired ' +
         'with a purchased rate cap. The distinction matters more than it sounds: a fixed rate that outlasts ' +
         'the business plan takes refinancing pressure off the table, while short floating-rate debt forces ' +
         'a refinance whether or not the market happens to be cooperating that month.',
      src: 'strategy.html#criteria', label: 'Acquisition criteria' },

    { id: 'g-vsreit', t: 'How it works',
      k: 'reit reits public stocks difference traded liquid versus private why not just buy a reit etf',
      q: 'Why not just buy a REIT?',
      a: 'They are genuinely different instruments. A REIT is liquid and publicly traded, so its price moves ' +
         'with equity markets, and it does not pass depreciation through to you the same way. A private ' +
         'partnership interest is illiquid, valued off property income rather than sentiment, and the ' +
         'depreciation flows through on a K-1. The trade is control and tax treatment in exchange for giving ' +
         'up the ability to sell on any given day.',
      src: 'faq.html', label: 'Investor questions' },

    { id: 'g-diligence', t: 'How it works',
      k: 'due diligence vet a sponsor questions to ask evaluate check background red flags how do i know trust',
      q: 'How do I vet a sponsor?',
      a: 'Ask specific questions rather than general ones &mdash; that is what separates sponsors. What ' +
         'happens when a business plan misses. How and when losses get reported. What the fee schedule is ' +
         'line by line. How much of the sponsor\'s own money is in the deal. What the debt terms are and ' +
         'when they mature. And what happened on the deals that did not go to plan. A sponsor who answers ' +
         'those directly is telling you something. So is one who does not.',
      src: 'faq.html', label: 'Investor questions' },

    { id: 'g-regd', t: 'Eligibility',
      k: 'reg d regulation 506b 506c rule difference private placement exempt offering securities law sec',
      q: 'What is Reg D 506(c)?',
      a: 'Regulation D is what exempts a private offering from full SEC registration. Rule 506(b) allows a ' +
         'limited number of non-accredited investors but forbids public advertising, so it runs on ' +
         'pre-existing relationships. Rule 506(c) permits public marketing but restricts participation to ' +
         'accredited investors whose status has been verified by a third party rather than self-certified. ' +
         'That verification requirement is the reason a 506(c) sponsor asks you for documentation.',
      src: 'invest.html', label: 'Start Investing' },

    { id: 'g-ppm', t: 'Eligibility',
      k: 'ppm private placement memorandum operating agreement subscription documents what will i sign paperwork',
      q: 'What documents will I sign?',
      a: 'Three documents carry the weight. The private placement memorandum sets out the offering, the ' +
         'risks and the conflicts. The operating or partnership agreement governs the entity &mdash; ' +
         'distributions, the waterfall, capital calls, transfer restrictions, what happens if the sponsor is ' +
         'removed. The subscription agreement is what you sign to commit. And where a website ever disagrees ' +
         'with those documents, the documents win.',
      src: 'invest.html', label: 'Start Investing' },

    { id: 'g-risks', t: 'Risk',
      k: 'risks generally of syndication what can go wrong private real estate danger downside lose everything',
      q: 'What can go wrong generally?',
      a: 'The ones that recur across this asset class: interest rate and refinancing risk, new supply ' +
         'flattening rents in a submarket, operating cost inflation with insurance leading it, illiquidity ' +
         'for the length of the hold, and execution risk on renovation and management. Leverage magnifies ' +
         'all of them, in both directions. They can be managed but not removed, and private real estate can ' +
         'lose value including the total loss of invested capital.',
      src: 'faq.html', label: 'Investor questions' },

    { id: 'g-class', t: 'How it works',
      k: 'workforce housing class a b c what does class b mean asset grading vintage quality affordable',
      q: 'What does Class B mean?',
      a: 'It is a grading by age, finish and location. Class A is new and commands the highest rents. B and ' +
         'C are older, cheaper to buy, and house the broad middle of the rental market &mdash; often called ' +
         'workforce housing. The argument for B and C is that the demand behind them is driven by ' +
         'affordability rather than preference, so it holds up when households trade down. New construction ' +
         'rarely competes at that price point, because it cannot be built for it.',
      src: 'strategy.html#criteria', label: 'Acquisition criteria' },

    { id: 'g-irr', t: 'Terms',
      k: 'irr internal rate of return equity multiple cash on cash difference which matters annualised metric',
      q: 'IRR, multiple or cash-on-cash?',
      a: 'Three ways of describing the same deal, and they can disagree. Cash-on-cash is annual ' +
         'distributions over capital invested, so it tells you about income while you hold. Equity multiple ' +
         'is total dollars back over dollars in, ignoring timing entirely. IRR annualises with timing ' +
         'weighted, so money returned earlier counts for more. A high IRR next to a low multiple usually ' +
         'means a quick exit rather than a better one, which is why the three are worth reading together.',
      src: 'faq.html', label: 'Investor questions', guard: true }
  ]
};
