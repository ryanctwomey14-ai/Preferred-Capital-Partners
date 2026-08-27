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
      'That is not something I can answer accurately. The team can — email ' +
      '<a href="mailto:tslaughter@prefcapitalpartners.com">tslaughter@prefcapitalpartners.com</a> ' +
      'or <a href="invest.html">request an introduction</a> and you will have a reply within one business day.',
    caveat:
      'Targets and terms are indicative, are not guaranteed, and are qualified in all respects by the ' +
      'offering documents for each investment.',
    greeting:
      'I can answer questions about how Preferred Capital Partners invests — eligibility, terms, tax ' +
      'treatment, reporting and risk. I am an automated assistant, not an adviser, and nothing here is ' +
      'investment, legal or tax advice.'
  },

  /* Suggested openers, shown before the first question. */
  prompts: [
    'Who can invest?',
    'What is the minimum?',
    'How and when am I paid?',
    'What are the fees?',
    'Can I use my IRA?',
    'What are the risks?'
  ],

  entries: [
    /* ---------------------------------------------------------- eligibility */
    { id: 'accredited', t: 'Eligibility',
      k: 'accredited accreditation eligibility eligible qualify qualified 506c regulation suitability participate income threshold networth',
      a: 'Offerings are made under Rule 506(c) of Regulation D, so participation is limited to accredited ' +
         'investors and accreditation must be verified by a third party rather than self-certified. You ' +
         'generally qualify on any one of three tests: individual income above $200,000 (or $300,000 jointly) ' +
         'in each of the last two years; net worth above $1 million excluding your primary residence; or an ' +
         'active Series 7, 65 or 82 licence.',
      src: 'invest.html#eligibility', label: 'Eligibility criteria' },

    { id: 'verification', t: 'Eligibility',
      k: 'verification verify proof letter cpa attorney accountant how do i prove third party',
      a: 'Verification is completed by a third party — typically a letter from your CPA or attorney, or an ' +
         'automated verification service. Rule 506(c) does not permit self-certification. It usually takes ' +
         'two to five days and happens after the introductory conversation, before offering materials are ' +
         'released.',
      src: 'invest.html#timeline', label: 'The process' },

    { id: 'notaccredited', t: 'Eligibility',
      k: 'non-accredited unaccredited dont qualify cannot qualify retail small',
      a: 'If you are not an accredited investor you cannot participate in these offerings — that is a legal ' +
         'restriction, not a firm policy. You are welcome to review the investor materials and the strategy ' +
         'in the meantime, neither of which requires accreditation.',
      src: 'strategy.html', label: 'Investment strategy' },

    /* --------------------------------------------------------------- terms */
    { id: 'minimum', t: 'Terms',
      k: 'minimum smallest amount how much invest entry ticket size start with 50000 50k',
      a: 'The typical minimum is $100,000 per offering. It is set in each offering\'s documents and can vary. ' +
         'If you are considering a first commitment below that, raise it on the introductory call.',
      src: 'invest.html#call', label: 'Investing', guard: true },

    { id: 'returns', t: 'Terms',
      k: 'return returns target irr arr yield how much do i make performance projections cash on cash equity multiple',
      a: 'Current targets are an annualised return of 15–20%, cash-on-cash of 7–10%, an equity multiple of ' +
         '1.8–2.2x and a hold period of three to seven years. These are underwriting targets, not results.',
      src: 'index.html', label: 'Target returns', guard: true },

    { id: 'preferred', t: 'Terms',
      k: 'preferred return pref hurdle 8% priority accrue cumulative what does preferred mean',
      a: 'A preferred return means limited partners receive their stated return before the sponsor ' +
         'participates in any profit. If cash flow only supports the preferred return, investors receive all ' +
         'of it and the sponsor receives none of the split. It typically accrues if unpaid, so a shortfall in ' +
         'one year is made up before the sponsor participates later.',
      src: 'strategy.html#waterfall', label: 'Distribution waterfall', guard: true },

    { id: 'waterfall', t: 'Terms',
      k: 'waterfall split profit share 70 30 promote carry how are profits divided order of payment',
      a: 'The order is: return of invested capital to limited partners first; then the preferred return on ' +
         'unreturned capital; then a profit split with the majority to limited partners. The sponsor also ' +
         'co-invests in every offering on the same terms. Exact splits and hurdles are set out in each ' +
         'operating agreement.',
      src: 'strategy.html#waterfall', label: 'Distribution waterfall', guard: true },

    { id: 'fees', t: 'Terms',
      k: 'fees fee cost charges expenses acquisition asset management disposition hidden what do you charge load',
      a: 'Acquisition, asset management and disposition fees are disclosed line by line in each private ' +
         'placement memorandum, along with any fees paid to affiliated entities. If a fee is not written into ' +
         'the documents, it does not exist. The specific schedule for a live offering is provided with the ' +
         'materials.',
      src: 'strategy.html#waterfall', label: 'How you get paid', guard: true },

    { id: 'hold', t: 'Terms',
      k: 'hold period how long timeline duration years when do i get capital back exit',
      a: 'The target hold is three to seven years. Capital is returned on a sale or refinance, not on a fixed ' +
         'date, and the hold can extend if selling into a weak market would damage the outcome.',
      src: 'strategy.html#criteria', label: 'Acquisition criteria', guard: true },

    /* ------------------------------------------------------- distributions */
    { id: 'distributions', t: 'Distributions',
      k: 'distribution paid payment quarterly when do i get paid income cash flow ach frequency',
      a: 'Distributions are paid quarterly by ACH, beginning in the quarter after a property stabilises under ' +
         'its business plan. Newly acquired assets in heavy renovation may have a stabilisation period first, ' +
         'which is disclosed in the offering.',
      src: 'invest.html#timeline', label: 'The process', guard: true },

    { id: 'pause', t: 'Distributions',
      k: 'pause paused cut reduced suspend stop distribution missed payment underperform',
      a: 'Yes, distributions can be reduced or paused. If an asset needs capital — a roof, a wave of turnover, ' +
         'an insurance repricing — protecting the property comes before a distribution. When that happens it ' +
         'is reported in the quarter it happens, with the reason and the plan.',
      src: 'faq.html', label: 'Investor questions', guard: true },

    /* ---------------------------------------------------------------- tax */
    { id: 'k1', t: 'Tax',
      k: 'k1 k-1 tax document schedule filing when do i get my k1 march taxes paperwork',
      a: 'You receive a Schedule K-1 for each tax year in which you held an interest, reporting your share of ' +
         'income, expenses and depreciation. Delivery is targeted for 31 March. If a K-1 will be late you are ' +
         'told before you need to file, not after.',
      src: 'faq.html', label: 'Investor questions' },

    { id: 'depreciation', t: 'Tax',
      k: 'depreciation tax benefit shelter write off cost segregation deduction paper loss taxable income',
      a: 'Real estate can be depreciated even while it appreciates. That depreciation is a non-cash expense ' +
         'that passes through on your K-1, so the taxable income reported to you is often lower than the cash ' +
         'you received. Many offerings accelerate it with a cost segregation study. Whether it offsets your ' +
         'other income depends on the passive activity rules and your own circumstances — a question for your ' +
         'CPA.',
      src: 'insights/real-estate-depreciation-explained.html', label: 'How depreciation works' },

    { id: 'recapture', t: 'Tax',
      k: 'recapture depreciation recapture pay it back sale taxed later deferral 25%',
      a: 'Depreciation reduces your cost basis, so on sale the portion of gain attributable to depreciation is ' +
         'recaptured and taxed — currently at a maximum federal rate of 25%. It is a deferral rather than a ' +
         'permanent exemption, which is the part most summaries leave out.',
      src: 'insights/real-estate-depreciation-explained.html', label: 'How depreciation works' },

    { id: 'ubti', t: 'Tax',
      k: 'ira 401k self directed retirement account ubti unrelated business taxable income solo roth custodian',
      a: 'Yes — self-directed IRAs, solo 401(k)s, revocable trusts and LLCs are all common. Note that ' +
         'debt-financed real estate held in a retirement account can generate unrelated business taxable ' +
         'income (UBTI). That is worth reviewing with your CPA before subscribing. We will work through your ' +
         'custodian\'s paperwork with you.',
      src: 'faq.html', label: 'Investor questions' },

    { id: 'statetax', t: 'Tax',
      k: 'state tax filing another state nonresident return multiple states',
      a: 'Possibly. Holding an interest in a partnership that owns property in another state can create a ' +
         'filing requirement there. The states involved are disclosed in each offering so your CPA can plan ' +
         'for it.',
      src: 'faq.html', label: 'Investor questions' },

    { id: 'exchange', t: 'Tax',
      k: '1031 exchange like kind swap defer gain roll over',
      a: 'Generally not into a fund interest. A 1031 exchange requires a direct interest in real property, and ' +
         'a partnership interest does not qualify. Ask about the specific structure of a current offering ' +
         'rather than assuming either way.',
      src: 'faq.html', label: 'Investor questions' },

    /* ---------------------------------------------------- risk & liquidity */
    { id: 'liquidity', t: 'Risk',
      k: 'liquid liquidity get money out early sell withdraw redeem exit early emergency locked up',
      a: 'You cannot. There is no public market for these interests and no redemption programme. Capital is ' +
         'committed until a sale or refinance returns it. That illiquidity is the price of the tax treatment ' +
         'and control you gain, and it means you should only commit capital you will not need during the hold.',
      src: 'strategy.html#risk', label: 'Principal risks' },

    { id: 'risks', t: 'Risk',
      k: 'risk risks lose money downside what could go wrong safe guarantee protection worst case',
      a: 'The principal risks are interest rate and refinancing risk, new supply in a submarket, operating ' +
         'cost inflation — insurance especially — illiquidity, and execution risk on renovation and ' +
         'management. These are managed, not eliminated. Private real estate can lose value, including the ' +
         'total loss of invested capital.',
      src: 'strategy.html#risk', label: 'Principal risks' },

    { id: 'underperform', t: 'Risk',
      k: 'underperform miss plan behind budget bad quarter problem trouble deal goes wrong',
      a: 'You hear it in that quarter\'s report, with the numbers and what is changing. Depending on severity ' +
         'the response may be pausing distributions, replacing the property manager, extending the hold, or in ' +
         'an extreme case selling at a loss. Capitalised reserves exist so that a difficult two years does not ' +
         'become a permanent loss.',
      src: 'faq.html', label: 'Investor questions' },

    { id: 'leverage', t: 'Risk',
      k: 'leverage debt loan ltv mortgage financing bridge floating fixed rate agency',
      a: 'Typically 60–70% loan-to-value on fixed or rate-capped agency debt, with terms that outlast the ' +
         'business plan by at least two years. The firm does not use short-term floating-rate bridge debt that ' +
         'matures into an unknown rate environment.',
      src: 'strategy.html#plan', label: 'The business plan', guard: true },

    /* ------------------------------------------------------------ strategy */
    { id: 'whatyoubuy', t: 'Strategy',
      k: 'what do you buy assets properties type criteria box target acquisition units vintage class b',
      a: 'Value-add workforce multifamily: 100–300 unit communities built between 1985 and 2010, B or B− class, ' +
         'stabilised above 85% occupancy at acquisition, with a rent gap of at least 12% between in-place ' +
         'rents and renovated comparables within two miles. Properties outside those parameters are not ' +
         'underwritten.',
      src: 'strategy.html#criteria', label: 'Acquisition criteria' },

    { id: 'markets', t: 'Strategy',
      k: 'where markets cities locations geography sunbelt charlotte houston sanantonio phoenix texas arizona carolina states',
      a: 'Four Sun Belt submarkets: Charlotte, San Antonio, Houston and Phoenix. ' +
         'Market selection is reviewed annually, and the firm will exit a market entirely rather than force a ' +
         'deal to stay in it.',
      src: 'strategy.html#markets', label: 'Target markets' },

    { id: 'businessplan', t: 'Strategy',
      k: 'business plan value add how do you make money renovate strategy approach five stages',
      a: 'Five stages on every asset: acquire below replacement cost; renovate units on turnover rather than ' +
         'displacing residents; professionalise operations; recover expenses through utility billback and ' +
         'ancillary income; then refinance or sell once income is stabilised at the new level.',
      src: 'strategy.html#plan', label: 'The business plan' },

    { id: 'whymultifamily', t: 'Strategy',
      k: 'why multifamily apartments why real estate inflation hedge uncorrelated diversification stock market',
      a: 'Apartment leases reprice annually, so the income stream has roughly one year of duration against a ' +
         'bond\'s ten or an office lease\'s fifteen. Combined with long-term fixed-rate debt, rents adjust while ' +
         'the mortgage payment does not. Values are set by property income rather than equity market ' +
         'sentiment, which is what gives the allocation its diversifying role.',
      src: 'insights/multifamily-inflation-hedge.html', label: 'Why apartments reprice' },

    { id: 'wontdo', t: 'Strategy',
      k: 'dont avoid never wont refuse exclude exclusions restrictions development ground up construction speculative bridge',
      a: 'No short-term floating-rate debt, no ground-up development or lease-up risk, no rent assumption that ' +
         'is not supported by a comparable unit already leasing at that number within two miles, and no fee ' +
         'structure that pays the sponsor before the preferred return.',
      src: 'strategy.html', label: 'Investment strategy' },

    /* ----------------------------------------------------------- operations */
    { id: 'reporting', t: 'Operations',
      k: 'reporting reports updates communication transparency what do i receive quarterly statement',
      a: 'A quarterly report per property or fund covering the operating statement, occupancy, renovation ' +
         'progress, variance against budget and a plain-language note on what changed — including what missed. ' +
         'Plus annual financial statements and your K-1. Everything is also available in the investor portal.',
      src: 'portal.html', label: 'Investor portal' },

    { id: 'portal', t: 'Operations',
      k: 'portal login sign in account access dashboard statements documents',
      a: 'The investor portal holds quarterly reports, distribution history, tax documents and current offering ' +
         'materials. It is hosted by the fund administrator, so your capital account is maintained ' +
         'independently of the people managing the properties. Access is granted after accreditation ' +
         'verification and your first subscription.',
      src: 'portal.html', label: 'Investor portal' },

    { id: 'coinvest', t: 'Operations',
      k: 'co-invest skin in the game own money alignment does the sponsor invest',
      a: 'The sponsor invests personally in every offering the firm sponsors, on the same terms as limited ' +
         'partners. When a distribution is reduced, it is reduced for the sponsor at the same time and in the ' +
         'same proportion.',
      src: 'about.html', label: 'About the firm' },

    { id: 'process', t: 'Operations',
      k: 'process steps start started starting begin beginning onboard onboarding timeline subscribe subscription sign wire nextstep',
      a: 'Four steps. An introductory conversation; third-party accreditation and portal access, usually two ' +
         'to five days; review of the memorandum, model and operating agreement with your own advisors, ' +
         'typically one to three weeks, with electronic subscription; then quarterly distributions and ' +
         'reporting once the asset is producing under plan.',
      src: 'invest.html#timeline', label: 'The process' },

    { id: 'entity', t: 'Operations',
      k: 'entity llc trust joint spouse partnership invest through name title',
      a: 'You can subscribe personally or through an LLC, a revocable trust, a self-directed IRA or a solo ' +
         '401(k). The subscription documents accommodate each; tell us the intended holder on the ' +
         'introductory call so the paperwork is prepared correctly.',
      src: 'faq.html', label: 'Investor questions' },

    /* ---------------------------------------------------------------- firm */
    { id: 'firm', t: 'The firm',
      k: 'who are you about firm company background history team leadership managing partner terrence',
      a: 'Preferred Capital Partners is a private real estate investment firm that acquires and operates ' +
         'multifamily assets in the Sun Belt on behalf of accredited investors. Fund ' +
         'administration, audit, tax, securities counsel and property management are handled by dedicated ' +
         'third parties, so investor records are not maintained solely by the people managing the properties.',
      src: 'about.html', label: 'About the firm' },

    { id: 'trackrecord', t: 'The firm',
      k: 'track record past performance history results previous deals realised exits case study experience',
      a: 'Current holdings and realised investments are set out on the portfolio page, including an ' +
         'underwritten-versus-actual comparison on a full-cycle asset. Past performance is not indicative of ' +
         'future results, and property-level figures are unaudited unless stated otherwise.',
      src: 'portfolio.html', label: 'Portfolio', guard: true },

    { id: 'contact', t: 'Contact',
      k: 'contact speak call talk human email phone reach someone person introduction meeting',
      a: 'Email <a href="mailto:tslaughter@prefcapitalpartners.com">tslaughter@prefcapitalpartners.com</a>, ' +
         'or <a href="invest.html">request an introduction</a> and you will have a reply within one business ' +
         'day. Introductory conversations are held by the managing partner.',
      src: 'contact.html', label: 'Contact' },

    { id: 'broker', t: 'Contact',
      k: 'broker brokerage deal deals dealflow selling sell listing agent submit opportunity acquisitions pipeline',
      a: 'Brokers with multifamily opportunities in our markets should send them to ' +
         '<a href="mailto:tslaughter@prefcapitalpartners.com">tslaughter@prefcapitalpartners.com</a>. ' +
         'The acquisition criteria are published so you can screen before sending.',
      src: 'strategy.html#criteria', label: 'Acquisition criteria' },

    /* -------------------------------------------------------------- limits */
    { id: 'advice', t: 'Limits',
      k: 'should i invest is this good for me recommend advice advise what would you do worth it',
      a: 'I cannot answer that, and neither can the firm — Preferred Capital Partners is not a registered ' +
         'investment adviser, and nothing on this site is investment, legal or tax advice. Whether this suits ' +
         'your circumstances is a question for your own advisers, working from the offering documents.',
      src: 'disclosures.html', label: 'Disclosures' },

    { id: 'guarantee', t: 'Limits',
      k: 'guarantee guaranteed promise sure thing safe cant lose principal protected insured',
      a: 'Nothing here is guaranteed. Targets are projections based on underwriting assumptions that may prove ' +
         'incorrect, and private real estate can lose value including the total loss of invested capital. Any ' +
         'sponsor describing a fixed return on a private real estate deal is describing something they cannot ' +
         'promise.',
      src: 'disclosures.html', label: 'Disclosures' }
  ]
};
