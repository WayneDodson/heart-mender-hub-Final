
import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BookOpen, FileText, HeartHandshake, Film, Lightbulb } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { Article } from '../components/ArticlePage';

const Resources = () => {
  const articles: Article[] = [
    {
      id: "5-stages-of-grief",
      title: "The 5 Stages of Grief After Divorce",
      description: "Understanding the emotional journey and how to move through each stage.",
      category: "emotional-healing",
      readTime: "8 min read",
      content: `
        <p>Divorce is undoubtedly one of life's most challenging transitions. The end of a marriage often triggers a profound grieving process similar to that experienced after a death. Elisabeth Kübler-Ross's model of the five stages of grief provides a helpful framework for understanding the emotional journey many people navigate after divorce.</p>
        
        <h2>Stage 1: Denial</h2>
        <p>In the initial stage, many people experience disbelief. Even if you initiated the divorce, there's often a period where the reality feels impossible to accept. You might catch yourself thinking, "This can't be happening" or "We'll work it out somehow." Denial serves as a psychological buffer, giving your mind time to gradually absorb the shock.</p>
        <p><strong>How to move through it:</strong> Acknowledge that denial is normal but try to gently face reality. Writing in a journal about your feelings or speaking with a trusted friend can help you begin to accept your new circumstances.</p>
        
        <h2>Stage 2: Anger</h2>
        <p>As denial fades, intense anger often emerges. You might feel rage toward your ex-spouse, yourself, or even uninvolved parties. This anger stems from the pain of loss and the upheaval in your life. While uncomfortable, anger is a natural part of the healing process.</p>
        <p><strong>How to move through it:</strong> Find healthy outlets for your anger, such as physical exercise, creative expression, or speaking with a therapist. Remember that while feeling angry is normal, acting destructively on that anger only creates more problems.</p>
        
        <h2>Stage 3: Bargaining</h2>
        <p>During the bargaining stage, you might find yourself dwelling on "what-ifs" and "if-onlys." There's a tendency to ruminate on past mistakes and fantasize about how things could have been different. This stage often involves self-blame and a desperate hope that somehow the outcome could still change.</p>
        <p><strong>How to move through it:</strong> Recognize that relationships end for complex reasons, rarely attributable to one person or incident. Practice self-compassion and begin to accept that looking backward prevents moving forward.</p>
        
        <h2>Stage 4: Depression</h2>
        <p>As the reality of your loss sets in more deeply, feelings of sadness, emptiness, and hopelessness may emerge. You might experience changes in sleep patterns, appetite, or struggle with motivation. This is a natural response to loss and an important part of the grieving process.</p>
        <p><strong>How to move through it:</strong> Take gentle care of yourself physically and emotionally. Maintain connections with supportive people. If depression becomes overwhelming or persistent, seek professional help from a therapist or counselor experienced in divorce recovery.</p>
        
        <h2>Stage 5: Acceptance</h2>
        <p>Acceptance doesn't mean you're "over it" or that you approve of what happened. Rather, it means you've come to terms with your new reality and are ready to build a new life. You might still feel sad occasionally, but these feelings no longer consume you.</p>
        <p><strong>How to move through it:</strong> Begin creating new routines and traditions. Set small, achievable goals for yourself. Explore new interests or revisit old ones that brought you joy before your marriage.</p>
        
        <h2>Important Reminders About Grief</h2>
        <p>These stages aren't a linear checklist, and you might move back and forth between them. Everyone's grieving process is unique—there's no "right" timeline or way to grieve. Sometimes you might experience multiple stages simultaneously.</p>
        <p>Healing happens gradually, and moments of regression are normal. With time, support, and self-compassion, you will find your way forward into a meaningful new chapter of life.</p>
      `
    },
    {
      id: "rediscovering-identity",
      title: "Rediscovering Your Identity After Divorce",
      description: "Practical steps to reconnect with yourself and build a new life.",
      category: "self-discovery",
      readTime: "10 min read",
      content: `
        <p>One of the most challenging aspects of divorce is the identity shift that accompanies it. When a marriage ends, many people realize how much of their self-perception was tied to their role as a spouse. This creates an opportunity—though initially a painful one—to rediscover who you are as an individual.</p>
        
        <h2>Understanding Identity Loss in Divorce</h2>
        <p>Marriage often involves intertwining your identity with your partner's. You likely made decisions as a unit, had shared social circles, and perhaps even adapted your personal preferences to accommodate your relationship. When this partnership dissolves, you might feel unmoored, wondering: "Who am I now?" This reaction is completely normal.</p>
        
        <h2>Step 1: Allow Yourself to Grieve</h2>
        <p>Before rebuilding, acknowledge what you've lost. Beyond the relationship itself, you may be grieving shared dreams, family traditions, financial security, or social connections. Give yourself permission to feel this grief without judgment. Processing these emotions creates space for new growth.</p>
        
        <h2>Step 2: Reconnect With Your Pre-Marriage Self</h2>
        <p>Think about activities, interests, and qualities that defined you before your marriage. Did you love hiking but stopped because your spouse preferred other activities? Were you once spontaneous but became more structured during your relationship? Make a list of attributes and interests you'd like to reclaim.</p>
        
        <h2>Step 3: Identify What You've Gained</h2>
        <p>Divorce, despite its difficulties, often develops new strengths. Perhaps you've become more resilient, self-sufficient, or empathetic through this experience. Recognizing these qualities helps incorporate them into your evolving identity.</p>
        
        <h2>Step 4: Experiment Without Commitment</h2>
        <p>This is a rare opportunity to try new things without having to consider how they fit into a partnership. Try activities you've always been curious about—art classes, martial arts, volunteering, or learning a new language. Approach this with playfulness rather than pressure; you're not committing to a lifetime hobby, just exploring possibilities.</p>
        
        <h2>Step 5: Reclaim Decision-Making</h2>
        <p>Practice making decisions based solely on your preferences, from small choices like what to have for dinner to larger ones like how to spend holidays. Notice if you automatically consider others' needs before your own—a common habit developed in relationships—and gently redirect focus to your authentic desires.</p>
        
        <h2>Step 6: Create New Routines and Spaces</h2>
        <p>Establish daily rhythms that reflect your natural preferences. Rearrange your living space to reflect your personal taste. These environmental changes support your internal identity shift.</p>
        
        <h2>Step 7: Build New Connections</h2>
        <p>Seek out social connections that align with your evolving sense of self. This might mean deepening existing friendships, reconnecting with old friends, or finding new communities through shared interests.</p>
        
        <h2>Step 8: Practice Self-Compassion</h2>
        <p>Identity reconstruction takes time and isn't always linear. You'll have days when you feel lost or uncertain—these are normal parts of the process. Speak to yourself with the kindness you'd offer a good friend going through this transition.</p>
        
        <h2>A New Chapter</h2>
        <p>Remember that rediscovering your identity isn't about erasing your marriage from your life story. That experience has contributed to who you are today. The goal isn't to become an entirely new person but to emerge as a more authentic version of yourself—one who carries forward valuable lessons while embracing new possibilities.</p>
        <p>This journey of rediscovery, though challenging, often leads to a more fulfilling, self-directed life than you might have imagined possible during the early stages of your divorce. Give yourself time, grace, and permission to evolve.</p>
      `
    },
    {
      id: "co-parenting-guide",
      title: "Co-Parenting After Separation: A Guide",
      description: "How to maintain healthy relationships for your children's wellbeing.",
      category: "relationships",
      readTime: "12 min read",
      content: `
        <p>When a marriage ends, but parenthood continues, co-parenting becomes one of the most important relationships in your life. Though challenging, successful co-parenting provides children with stability, security, and healthy models for relationships—even after divorce.</p>
        
        <h2>The Foundation: Children First</h2>
        <p>The core principle of effective co-parenting is prioritizing your children's wellbeing above all else—including any negative feelings toward your ex. This doesn't mean ignoring your emotions, but rather finding appropriate outlets for them separate from your parenting relationship.</p>
        <p>Children benefit most when they:</p>
        <ul>
          <li>Are shielded from parental conflict</li>
          <li>Maintain meaningful relationships with both parents (when safe)</li>
          <li>Experience consistent rules and expectations across households</li>
          <li>Are never used as messengers or confidants in adult matters</li>
        </ul>
        
        <h2>Communication Strategies</h2>
        <p><strong>Treat it as a business relationship:</strong> Professional, focused, and goal-oriented communication helps remove emotional triggers.</p>
        <p><strong>Use appropriate channels:</strong> Determine which communication methods work best—email for detailed planning, texting for quick updates, co-parenting apps for scheduling.</p>
        <p><strong>Practice active listening:</strong> Even when you disagree with your co-parent, demonstrating that you've heard their perspective creates more productive conversations.</p>
        <p><strong>Focus on the present:</strong> Keep conversations centered on current parenting matters rather than revisiting past relationship issues.</p>
        <p><strong>Consider a communication schedule:</strong> Regular check-ins about the children (weekly or bi-weekly) can prevent issues from escalating.</p>
        
        <h2>Creating Consistency Between Homes</h2>
        <p>While some differences between households are inevitable, maintaining consistency in key areas helps children adjust:</p>
        <p><strong>Major rules and discipline:</strong> Align on fundamental expectations, consequences, and values.</p>
        <p><strong>Routines:</strong> Similar bedtimes, homework practices, and meal schedules provide security.</p>
        <p><strong>Major parenting decisions:</strong> Educational choices, medical care, and religious upbringing require collaborative discussion.</p>
        <p><strong>Information sharing:</strong> Keep each other informed about significant events in your child's life, health concerns, and developmental milestones.</p>
        
        <h2>Managing Transitions Between Homes</h2>
        <p>Exchanges can be emotionally charged for everyone involved. Consider these practices:</p>
        <p><strong>Create a neutral exchange location</strong> if face-to-face meetings are tense.</p>
        <p><strong>Develop transition rituals</strong> that help children adjust, such as a special welcome back activity.</p>
        <p><strong>Pack a transitional object</strong> that travels between homes, providing emotional security.</p>
        <p><strong>Allow adjustment time</strong> when children return from the other parent's home before diving into tasks or serious conversations.</p>
        
        <h2>Navigating Holidays and Special Events</h2>
        <p>These moments can be particularly challenging but also opportunities to demonstrate healthy co-parenting:</p>
        <p><strong>Plan well in advance</strong> to avoid last-minute conflicts.</p>
        <p><strong>Consider alternating years</strong> for major holidays or splitting the day when practical.</p>
        <p><strong>Be flexible</strong> and willing to adjust when unexpected situations arise.</p>
        <p><strong>Focus on creating quality experiences</strong> rather than competing or comparing celebrations.</p>
        
        <h2>When Co-Parenting Is Difficult</h2>
        <p>If communication consistently breaks down, consider:</p>
        <p><strong>Co-parenting counseling</strong> with a professional who specializes in post-divorce family dynamics.</p>
        <p><strong>Co-parenting classes</strong> which provide structured guidance and techniques.</p>
        <p><strong>Mediation</strong> for specific unresolved issues.</p>
        <p><strong>Clear parenting plan modifications</strong> that address recurring problems.</p>
        
        <h2>Supporting Your Child's Emotional Journey</h2>
        <p>Beyond practical co-parenting arrangements, children need emotional support:</p>
        <p><strong>Create safe spaces</strong> for them to express feelings about the divorce and family changes.</p>
        <p><strong>Reassure them regularly</strong> that both parents love them and the divorce wasn't their fault.</p>
        <p><strong>Don't ask them to keep secrets</strong> from either parent.</p>
        <p><strong>Validate their experiences</strong> without judgment, even when their perspective differs from yours.</p>
        <p><strong>Consider professional support</strong> through child-centered therapy when needed.</p>
        
        <h2>The Long View</h2>
        <p>Co-parenting relationships evolve over time. What seems impossible during the early stages of divorce often improves as emotions settle and new patterns establish. With consistent effort and focus on your children's needs, you can build a functional—and sometimes even friendly—co-parenting relationship that supports your children's journey to healthy adulthood.</p>
      `
    },
    {
      id: "financial-recovery",
      title: "Financial Recovery Post-Divorce",
      description: "Rebuilding your financial foundation and planning for your future.",
      category: "practical-advice",
      readTime: "9 min read",
      content: `
        <p>Divorce often brings significant financial challenges, from dividing assets to establishing a single-income household. However, with thoughtful planning and deliberate steps, financial recovery is absolutely achievable. This guide offers practical strategies to help you rebuild financial stability and confidence after divorce.</p>
        
        <h2>Phase 1: Assessment and Organization</h2>
        
        <h3>Take Stock of Your Current Position</h3>
        <p>Begin by gathering a complete picture of your financial situation:</p>
        <ul>
          <li>Make a detailed list of all assets in your name</li>
          <li>Document all debts and monthly payment obligations</li>
          <li>Review your credit report for accuracy</li>
          <li>Calculate your current income from all sources</li>
          <li>Track your expenses for at least one month</li>
        </ul>
        
        <h3>Update Financial Accounts and Documents</h3>
        <p>Ensure you've addressed these critical changes:</p>
        <ul>
          <li>Open individual bank accounts if you haven't already</li>
          <li>Remove ex-spouse from joint accounts or close them entirely</li>
          <li>Change beneficiaries on retirement accounts and insurance policies</li>
          <li>Update your will, power of attorney, and other estate documents</li>
          <li>Establish credit in your own name</li>
        </ul>
        
        <h2>Phase 2: Stabilization</h2>
        
        <h3>Create a Realistic Post-Divorce Budget</h3>
        <p>Your financial landscape has changed, and your budget needs to reflect this new reality:</p>
        <ul>
          <li>Start with essential expenses: housing, utilities, food, transportation</li>
          <li>Factor in debt payments and regular obligations</li>
          <li>Include savings—even small amounts matter</li>
          <li>Be honest about your current income constraints</li>
          <li>Identify areas where you can temporarily reduce spending</li>
        </ul>
        
        <h3>Build an Emergency Fund</h3>
        <p>Financial security begins with a safety net:</p>
        <ul>
          <li>Aim for at least 3-6 months of essential expenses</li>
          <li>Start with a smaller goal if necessary—even $1,000 can prevent minor emergencies from becoming financial crises</li>
          <li>Set up automatic transfers to make saving consistent</li>
          <li>Keep these funds in an accessible but separate account</li>
        </ul>
        
        <h3>Address Debt Strategically</h3>
        <p>Managing debt is crucial to financial recovery:</p>
        <ul>
          <li>Confirm which debts are legally your responsibility post-divorce</li>
          <li>Contact creditors if you need temporary hardship accommodations</li>
          <li>Consider consolidating high-interest debts if it reduces your rates</li>
          <li>Develop a repayment strategy (either focusing on highest-interest debts first or smallest balances for psychological wins)</li>
        </ul>
        
        <h2>Phase 3: Rebuilding for the Future</h2>
        
        <h3>Reassess Your Career Path</h3>
        <p>Your earning potential is now entirely your responsibility:</p>
        <ul>
          <li>Evaluate whether additional education or training would increase your income</li>
          <li>Consider whether your current job provides the growth potential you need</li>
          <li>Explore flexible work arrangements if you have new family responsibilities</li>
          <li>Look into professional networking opportunities in your field</li>
        </ul>
        
        <h3>Recalibrate Your Retirement Planning</h3>
        <p>Divorce often disrupts retirement savings:</p>
        <ul>
          <li>Calculate how divorce has affected your retirement assets</li>
          <li>Increase contributions if possible to make up for divided assets</li>
          <li>Take advantage of catch-up contributions if you're over 50</li>
          <li>Adjust your expected retirement age if necessary</li>
          <li>Consider meeting with a financial advisor who specializes in post-divorce planning</li>
        </ul>
        
        <h3>Establish New Financial Goals</h3>
        <p>Creating new financial objectives helps redirect your focus to the future:</p>
        <ul>
          <li>Define short-term goals (1-2 years), medium-term goals (3-5 years), and long-term goals (5+ years)</li>
          <li>Make your goals specific and measurable</li>
          <li>Connect financial goals to personal values and priorities</li>
          <li>Create visual reminders of what you're working toward</li>
        </ul>
        
        <h2>Phase 4: Protection and Growth</h2>
        
        <h3>Review Insurance Needs</h3>
        <p>Your protection requirements likely changed with divorce:</p>
        <ul>
          <li>Health insurance: Secure coverage if you were previously on your spouse's plan</li>
          <li>Life insurance: Adjust policies, especially if you have dependent children</li>
          <li>Disability insurance: More crucial than ever as a single-income household</li>
          <li>Property insurance: Update to reflect your current assets</li>
        </ul>
        
        <h3>Consider Tax Implications</h3>
        <p>Divorce significantly changes your tax situation:</p>
        <ul>
          <li>Understand your new filing status</li>
          <li>Adjust tax withholding to reflect your changed circumstances</li>
          <li>Document alimony and child support appropriately</li>
          <li>Consider consulting with a tax professional for your first post-divorce tax return</li>
        </ul>
        
        <h2>Moving Forward with Confidence</h2>
        <p>Financial recovery after divorce is rarely immediate, but progress is possible with consistent effort. Each positive financial step rebuilds not just your bank account, but also your confidence in your ability to thrive independently. Be patient with yourself, celebrate small victories, and remember that many people have successfully rebuilt financial security after divorce—and often found themselves stronger and more financially savvy in the process.</p>
      `
    },
    {
      id: "healing-rituals",
      title: "Healing Rituals for Moving On",
      description: "Symbolic practices that can help you process grief and find closure.",
      category: "emotional-healing",
      readTime: "7 min read",
      content: `
        <p>The end of a marriage represents not just a legal change, but a profound emotional transition. Throughout human history, people have used rituals and symbolic actions to mark significant life changes. These practices can help process complex emotions, create meaningful closure, and signal a new beginning. This article explores healing rituals that can support your journey forward after divorce.</p>
        
        <h2>Why Rituals Matter in Healing</h2>
        <p>Rituals serve several important psychological functions during major life transitions:</p>
        <ul>
          <li>They externalize internal emotional processes</li>
          <li>They create concrete markers between "before" and "after"</li>
          <li>They provide a sense of control during uncertain times</li>
          <li>They help the brain process and integrate difficult experiences</li>
          <li>They honor the significance of what has changed</li>
        </ul>
        <p>When we divorce, legal procedures handle the practical separation, but rituals help us process the emotional one.</p>
        
        <h2>Personal Closure Rituals</h2>
        
        <h3>The Letter You'll Never Send</h3>
        <p>Write everything you wish you could say to your former spouse—all the hurt, anger, gratitude, regrets, and wishes. Express yourself completely without filtering. Then, choose a way to release it: burn it safely and watch the smoke rise, bury it in the earth, or tear it into pieces and let them go in moving water.</p>
        
        <h3>The Wedding Ring Transformation</h3>
        <p>If you still have your wedding ring, consider transforming it into something new. Many jewelers can recast wedding bands into different pieces of jewelry that represent your new chapter—perhaps a pendant symbolizing strength, earrings representing balance, or a ring for your right hand signifying self-commitment.</p>
        
        <h3>A Cleansing Practice</h3>
        <p>Cultures worldwide use water for spiritual cleansing. Create your own ritual with a special bath or shower. Add elements that engage your senses—essential oils, candles, music. As you bathe, visualize the water washing away old pain and resentment, leaving you refreshed and renewed.</p>
        
        <h3>Space Clearing</h3>
        <p>If you're staying in the home you shared with your ex-spouse, consider a space-clearing ritual. This might involve:</p>
        <ul>
          <li>Smudging with sage or using sound (like bells) to clear stagnant energy</li>
          <li>Rearranging furniture to create new pathways and perspectives</li>
          <li>Replacing or moving artwork and photos to reflect your current life</li>
          <li>Repainting a room in a color that feels fresh and inspiring</li>
        </ul>
        
        <h2>Rituals for New Beginnings</h2>
        
        <h3>Vision Board Creation</h3>
        <p>Gather magazines, personal photos, inspirational quotes, and art supplies. Create a visual representation of what you want to cultivate in this new chapter. Include images that represent your values, aspirations, and the feeling states you want to experience. Place your finished vision board where you'll see it daily.</p>
        
        <h3>Planting Ceremony</h3>
        <p>Select a plant or tree that symbolizes your new beginning. As you plant it, set intentions for your growth. Caring for this living thing becomes a regular reminder of your own nurturing and development. Choose something that suits your living situation—a garden tree, houseplant, or even herb garden.</p>
        
        <h3>New Moon Intentions</h3>
        <p>The new moon symbolizes fresh starts in many traditions. Create a monthly ritual of setting intentions during the new moon. Light a candle, reflect on the previous month, and write specific intentions for the coming lunar cycle. This creates an ongoing practice of renewal and intentional living.</p>
        
        <h3>Solo Adventure</h3>
        <p>Plan and take a trip alone—even if it's just a day trip to somewhere you've never been. This ritual helps you reconnect with your independence and creates new memories that belong solely to you. Document your journey through photos or journaling to mark this step into self-sufficient exploration.</p>
        
        <h2>Communal Rituals</h2>
        
        <h3>Divorce Ceremony</h3>
        <p>Just as we mark marriages with ceremonies, some people find value in marking their ending. A divorce ceremony might include:</p>
        <ul>
          <li>Supportive friends sharing positive wishes for your future</li>
          <li>A friend or facilitator guiding a process of acknowledging what's ending and what's beginning</li>
          <li>Exchanging the symbolic accoutrements of marriage for symbols of your independent life</li>
          <li>Sharing a meal after, celebrating new beginnings</li>
        </ul>
        
        <h3>Support Circle</h3>
        <p>Gather close friends for an intentional evening of support. Create a simple structure where each person offers something to your healing—perhaps a piece of advice, a poem, a small symbolic gift, or a commitment to support you in a specific way during your transition.</p>
        
        <h2>Creating Your Own Meaningful Ritual</h2>
        <p>The most powerful rituals are those that feel personally meaningful. When designing your own:</p>
        <ul>
          <li>Consider what you most need—closure, release, vision, or connection</li>
          <li>Incorporate elements that engage multiple senses</li>
          <li>Include clear symbolic actions that represent your internal process</li>
          <li>Set aside uninterrupted time in a space that feels comfortable and safe</li>
          <li>Approach the ritual with intention and presence</li>
        </ul>
        
        <h2>The Ongoing Journey</h2>
        <p>While rituals can create powerful moments of transition, healing after divorce is an ongoing process. These symbolic practices serve as milestones along the way, helping you consciously mark your progress and create meaning from challenge. They remind us that humans have been navigating profound life changes for millennia, and that we have the inner resources to transform difficulty into growth.</p>
      `
    },
    {
      id: "dating-again",
      title: "When to Start Dating Again",
      description: "Signs you're ready to open your heart and what to expect.",
      category: "relationships",
      readTime: "11 min read",
      content: `
        <p>After divorce, the question of when—or whether—to date again looms large in many people's minds. Some feel eager to find connection quickly, while others worry they might never be ready. There's no universal timeline for post-divorce dating, but there are signs of readiness and strategies for approaching new relationships in a healthy way.</p>
        
        <h2>Signs You Might Be Ready to Date</h2>
        
        <h3>You've Processed the Core Emotions</h3>
        <p>While you don't need to be completely "over" your divorce, dating becomes healthier when you've worked through the most intense feelings. Signs include:</p>
        <ul>
          <li>You can think about your ex without being overwhelmed by anger or longing</li>
          <li>You've identified lessons from your marriage and take responsibility for your part</li>
          <li>You can talk about your divorce calmly, without it dominating the conversation</li>
          <li>Your emotional reactions feel proportionate to current situations, not colored by past hurts</li>
        </ul>
        
        <h3>You're Comfortable With Your Independence</h3>
        <p>Dating from a place of wholeness rather than emptiness creates healthier connections:</p>
        <ul>
          <li>You've established routines and a life structure that works for you</li>
          <li>You enjoy your own company and have activities you genuinely like doing alone</li>
          <li>You have a support network beyond a potential romantic partner</li>
          <li>You're financially responsible for yourself (even if resources are tight)</li>
        </ul>
        
        <h3>You're Dating for the Right Reasons</h3>
        <p>Your motivations for dating significantly impact your experience:</p>
        <ul>
          <li>You're seeking connection and companionship, not trying to fill an emotional void</li>
          <li>You're not trying to "show" your ex anything through your dating choices</li>
          <li>You're not dating primarily out of loneliness or fear of being alone</li>
          <li>You're genuinely open to getting to know new people, not just recreating your past relationship</li>
        </ul>
        
        <h2>Practical Considerations Before Dating</h2>
        
        <h3>For Those With Children</h3>
        <p>Dating as a parent adds complexity:</p>
        <ul>
          <li>Consider how stable your children feel in the post-divorce routine before introducing new variables</li>
          <li>Decide in advance when and how you'll introduce dates to your children (most therapists recommend waiting until a relationship has become serious and stable)</li>
          <li>Be prepared for a range of reactions from your children</li>
          <li>Create clear boundaries that protect your children's sense of security</li>
        </ul>
        
        <h3>Legal and Financial Factors</h3>
        <p>In some cases, practical matters may influence timing:</p>
        <ul>
          <li>Verify that your divorce is legally finalized</li>
          <li>Understand whether dating could impact any ongoing legal proceedings</li>
          <li>Consider whether you're financially ready to date (which can involve expenses)</li>
          <li>Be clear on how entwined you want finances to be in new relationships</li>
        </ul>
        
        <h2>Navigating the Changed Dating Landscape</h2>
        
        <h3>Acknowledging New Realities</h3>
        <p>Dating may have changed significantly since you were last single:</p>
        <ul>
          <li>Dating apps have become a primary way people meet, each with different demographics and purposes</li>
          <li>Social expectations and dating norms may have shifted</li>
          <li>Your own age group is likely navigating different life stages than when you last dated</li>
          <li>You bring different life experiences, possibly including children, established careers, and property</li>
        </ul>
        
        <h3>Setting Boundaries and Expectations</h3>
        <p>Clear boundaries protect your well-being as you venture into dating:</p>
        <ul>
          <li>Decide what information about your divorce you're comfortable sharing and when</li>
          <li>Identify your non-negotiable values and needs in a relationship</li>
          <li>Determine your comfort level with physical intimacy and pace</li>
          <li>Consider whether you're looking for casual dating or a potential long-term relationship</li>
        </ul>
        
        <h2>First Steps Into Dating</h2>
        
        <h3>Start Slowly</h3>
        <p>A gradual approach helps you adjust and learn:</p>
        <ul>
          <li>Begin with casual group activities or events related to your interests</li>
          <li>Consider saying yes to introductions through trusted friends</li>
          <li>If using dating apps, start with brief coffee dates rather than lengthy or intimate encounters</li>
          <li>Give yourself permission to pause if you feel overwhelmed</li>
        </ul>
        
        <h3>Managing Common Emotional Reactions</h3>
        <p>First post-divorce dating experiences often trigger unexpected feelings:</p>
        <ul>
          <li>Guilt or feeling like you're "cheating," even though your marriage has ended</li>
          <li>Comparing new people to your ex-spouse (consciously or unconsciously)</li>
          <li>Anxiety about vulnerability and potential rejection</li>
          <li>Overattachment or withdrawal when old relationship patterns are triggered</li>
        </ul>
        
        <h2>Building Healthy New Relationships</h2>
        
        <h3>Communicate Your Journey</h3>
        <p>Authentic communication creates strong foundations:</p>
        <ul>
          <li>Share your divorce experience when appropriate, without oversharing details early on</li>
          <li>Be honest about your relationship goals and timeline</li>
          <li>Discuss expectations regarding children, if applicable</li>
          <li>Express your needs and boundaries clearly</li>
        </ul>
        
        <h3>Watch for Red Flags</h3>
        <p>Divorce can sharpen your awareness of relationship dynamics:</p>
        <ul>
          <li>Notice if you're repeating patterns from your marriage</li>
          <li>Be cautious of partners who are critical of your independence</li>
          <li>Be wary of rushing into serious commitment before establishing trust</li>
          <li>Pay attention if friends or family express concerns about a new relationship</li>
        </ul>
        
        <h2>The Gift of Starting Fresh</h2>
        <p>Post-divorce dating, while sometimes challenging, offers unique opportunities:</p>
        <ul>
          <li>You know yourself better now than when you first started dating</li>
          <li>You're likely clearer about what works for you in relationships</li>
          <li>You've developed resilience that can help you navigate the ups and downs of dating</li>
          <li>You have the chance to create relationships that truly align with who you are today</li>
        </ul>
        <p>Whether you decide to date soon after divorce, years later, or choose not to pursue romantic relationships at all, trust your instincts about what feels right for your journey. The most important relationship is the one you have with yourself—nurture that first, and other connections will find their natural place in your life.</p>
      `
    }
  ];
  
  const exercises = [
    {
      title: "Gratitude Journal",
      description: "Daily prompts to help you focus on the positive aspects of your new life.",
      category: "emotional-healing"
    },
    {
      title: "Letter to Your Former Self",
      description: "A writing exercise to acknowledge your growth and provide self-compassion.",
      category: "self-discovery"
    },
    {
      title: "Boundary Setting Workshop",
      description: "Interactive guide to establishing healthy boundaries in your relationships.",
      category: "relationships"
    },
    {
      title: "Future Visualization",
      description: "Guided meditation to help you envision and create your desired future.",
      category: "emotional-healing"
    },
    {
      title: "Values Reassessment",
      description: "Exercise to identify what truly matters to you now and align your life accordingly.",
      category: "self-discovery"
    }
  ];

  const bookRecommendations = [
    {
      title: "Conscious Uncoupling",
      author: "Katherine Woodward Thomas",
      description: "5 steps to living happily even after divorce."
    },
    {
      title: "Rebuilding When Your Relationship Ends",
      author: "Bruce Fisher & Robert Alberti",
      description: "A comprehensive guide to the emotional aspects of divorce recovery."
    },
    {
      title: "The Journey from Abandonment to Healing",
      author: "Susan Anderson",
      description: "Turn the end of a relationship into the beginning of your journey to self-discovery."
    }
  ];

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="bg-healing-100 py-12 px-4">
          <div className="container mx-auto text-center max-w-3xl">
            <h1 className="text-4xl font-bold mb-4 text-healing-900">Healing Resources</h1>
            <p className="text-lg text-gray-700">
              Discover tools, articles, exercises, and recommendations to support your healing journey after divorce.
            </p>
          </div>
        </section>
        
        {/* Resources Tabs */}
        <section className="py-12 px-4">
          <div className="container mx-auto">
            <Tabs defaultValue="articles" className="max-w-5xl mx-auto">
              <TabsList className="grid w-full grid-cols-4 mb-8">
                <TabsTrigger value="articles" className="flex items-center gap-2">
                  <FileText className="h-4 w-4" /> Articles
                </TabsTrigger>
                <TabsTrigger value="exercises" className="flex items-center gap-2">
                  <Lightbulb className="h-4 w-4" /> Exercises
                </TabsTrigger>
                <TabsTrigger value="books" className="flex items-center gap-2">
                  <BookOpen className="h-4 w-4" /> Books
                </TabsTrigger>
                <TabsTrigger value="videos" className="flex items-center gap-2">
                  <Film className="h-4 w-4" /> Videos
                </TabsTrigger>
              </TabsList>
              
              <TabsContent value="articles" className="animate-fade-in">
                <h2 className="text-2xl font-semibold mb-6 text-healing-800">Helpful Articles</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {articles.map((article, index) => (
                    <Card key={index} className="border border-healing-100 hover:shadow-md transition-shadow h-full">
                      <CardHeader>
                        <div className="text-sm font-medium text-healing-600 mb-1">
                          {article.category.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}
                        </div>
                        <CardTitle className="text-xl">{article.title}</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <CardDescription>{article.description}</CardDescription>
                      </CardContent>
                      <CardFooter className="flex justify-between items-center">
                        <div className="text-sm text-gray-500">{article.readTime}</div>
                        <Button variant="ghost" className="text-healing-600 hover:text-healing-700 hover:bg-healing-50">
                          <Link to={`/resources/article/${article.id}`}>Read More</Link>
                        </Button>
                      </CardFooter>
                    </Card>
                  ))}
                </div>
              </TabsContent>
              
              <TabsContent value="exercises" className="animate-fade-in">
                <h2 className="text-2xl font-semibold mb-6 text-healing-800">Healing Exercises</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {exercises.map((exercise, index) => (
                    <Card key={index} className="border border-healing-100 hover:shadow-md transition-shadow">
                      <CardHeader>
                        <div className="text-sm font-medium text-healing-600 mb-1">
                          {exercise.category.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}
                        </div>
                        <CardTitle className="text-xl">{exercise.title}</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <CardDescription>{exercise.description}</CardDescription>
                      </CardContent>
                      <CardFooter>
                        <Button className="w-full bg-healing-500 hover:bg-healing-600">Start Exercise</Button>
                      </CardFooter>
                    </Card>
                  ))}
                </div>
                <div className="mt-8 text-center">
                  <p className="text-gray-600 mb-4">New exercises are added regularly to support different aspects of your healing journey.</p>
                </div>
              </TabsContent>
              
              <TabsContent value="books" className="animate-fade-in">
                <h2 className="text-2xl font-semibold mb-6 text-healing-800">Recommended Books</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {bookRecommendations.map((book, index) => (
                    <Card key={index} className="border border-healing-100 hover:shadow-md transition-shadow">
                      <CardHeader>
                        <CardTitle className="text-xl">{book.title}</CardTitle>
                        <div className="text-sm font-medium text-healing-600">by {book.author}</div>
                      </CardHeader>
                      <CardContent>
                        <CardDescription>{book.description}</CardDescription>
                      </CardContent>
                      <CardFooter>
                        <Button variant="outline" className="w-full">Find Book</Button>
                      </CardFooter>
                    </Card>
                  ))}
                </div>
                <div className="mt-8 text-center">
                  <p className="text-gray-600">These books have helped many people navigate the emotional challenges of divorce and find healing.</p>
                </div>
              </TabsContent>
              
              <TabsContent value="videos" className="animate-fade-in">
                <div className="text-center py-12">
                  <HeartHandshake className="h-16 w-16 text-healing-300 mx-auto mb-4" />
                  <h2 className="text-2xl font-semibold mb-2 text-healing-800">Coming Soon</h2>
                  <p className="text-gray-600 max-w-lg mx-auto">
                    We're currently curating a collection of helpful videos to support your healing journey. 
                    Check back soon for guided meditations, expert interviews, and inspirational stories.
                  </p>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </section>
        
        {/* Self-Care Section */}
        <section className="py-12 px-4 bg-healing-50">
          <div className="container mx-auto">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-3xl font-bold mb-6 text-healing-800">Daily Self-Care Reminder</h2>
              <p className="text-lg text-gray-700 mb-8">
                Remember that healing is not linear. Some days will be harder than others, 
                and that's okay. Be patient and gentle with yourself as you move through this process.
              </p>
              <div className="bg-white p-6 rounded-lg shadow-sm border border-healing-100">
                <h3 className="text-xl font-semibold mb-4 text-healing-700">Today's Affirmation</h3>
                <p className="text-xl italic text-gray-700">
                  "I am healing more each day. My worth is not defined by my past relationship, 
                  but by the love and care I give myself now."
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Resources;
