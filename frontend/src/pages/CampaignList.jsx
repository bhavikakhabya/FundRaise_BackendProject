import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

function CampaignList() {
    const [campaigns, setCampaigns] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchCampaigns = async () => {
        try {
            const response = await axios.get(
                "http://localhost:5001/api/campaigns"
            );

            setCampaigns(response.data);

        } catch (error) {
            console.log(error);

        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchCampaigns();
    }, []);

    // Choose image based on campaign title
    const getCampaignImage = (title) => {
        const name = title.toLowerCase();

        if (
            name.includes("education") ||
            name.includes("student") ||
            name.includes("school")
        ) {
            return "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?auto=format&fit=crop&w=900&q=80";
        }

        if (
            name.includes("medical") ||
            name.includes("health") ||
            name.includes("hospital")
        ) {
            return "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=900&q=80";
        }

        if (
            name.includes("animal") ||
            name.includes("pet")
        ) {
            return "https://images.unsplash.com/photo-1450778869180-41d0601e046e?auto=format&fit=crop&w=900&q=80";
        }

        if (
            name.includes("food") ||
            name.includes("hunger")
        ) {
            return "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?auto=format&fit=crop&w=900&q=80";
        }

        return "https://images.unsplash.com/photo-1469571486292-0ba58a3f068b?auto=format&fit=crop&w=900&q=80";
    };

    if (loading) {
        return (
            <div className="loading">
                <div className="loading-heart">♥</div>
                <h2>Loading campaigns...</h2>
                <p>Finding causes that need your support.</p>
            </div>
        );
    }

    return (
        <div className="campaign-container">

            {/* HERO SECTION */}
            <section className="hero-section">

                <div className="hero-content">

                    <span className="hero-tag">
                        MAKE A DIFFERENCE ✨
                    </span>

                    <h1>
                        Small actions.
                        <br />
                        <span>Big impact. 💜</span>
                    </h1>

                    <p>
                        Support meaningful causes and help create
                        a better tomorrow, one contribution at a time.
                    </p>

                    <a
                        href="#campaigns"
                        className="hero-button"
                    >
                        Explore Campaigns
                        <span>↓</span>
                    </a>

                </div>

                <div className="hero-decoration hero-decoration-one">
                    ♥
                </div>

                <div className="hero-decoration hero-decoration-two">
                    ✦
                </div>

            </section>

            {/* CAMPAIGNS SECTION */}
            <section
                className="campaign-section"
                id="campaigns"
            >

                <div className="section-heading">

                    <div>
                        <span className="section-label">
                            OUR CAMPAIGNS
                        </span>

                        <h2>
                            Causes that matter
                        </h2>

                        <p>
                            Choose a campaign and make an impact.
                        </p>
                    </div>

                    <span className="campaign-count">
                        {campaigns.length} Campaigns
                    </span>

                </div>

                {/* CAMPAIGN GRID */}
                <div className="campaign-grid">

                    {campaigns.length === 0 ? (

                        <div className="empty-state">

                            <div className="empty-icon">
                                💜
                            </div>

                            <h2>
                                No campaigns available
                            </h2>

                            <p>
                                New campaigns will appear here soon.
                            </p>

                        </div>

                    ) : (

                        campaigns.map((campaign) => {

                            const progress = Math.min(
                                (campaign.raisedAmount /
                                    campaign.targetAmount) *
                                    100,
                                100
                            );

                            return (
                                <div
                                    className="campaign-card"
                                    key={campaign._id}
                                >

                                    {/* IMAGE */}
                                    <div className="campaign-image">

                                        <img
                                            src={getCampaignImage(
                                                campaign.title
                                            )}
                                            alt={campaign.title}
                                        />

                                        <span
                                            className={
                                                campaign.status ===
                                                "completed"
                                                    ? "status completed"
                                                    : "status active"
                                            }
                                        >
                                            {campaign.status}
                                        </span>

                                    </div>

                                    {/* CARD CONTENT */}
                                    <div className="campaign-card-content">

                                        <h2>
                                            {campaign.title}
                                        </h2>

                                        <p className="campaign-description">
                                            {campaign.description}
                                        </p>

                                        <div className="amount-row">

                                            <div>
                                                <strong>
                                                    ₹
                                                    {campaign.raisedAmount}
                                                </strong>

                                                <span>
                                                    raised
                                                </span>
                                            </div>

                                            <div className="target">
                                                Goal ₹
                                                {campaign.targetAmount}
                                            </div>

                                        </div>

                                        {/* PROGRESS */}
                                        <div className="progress-bar">

                                            <div
                                                className="progress"
                                                style={{
                                                    width: `${progress}%`
                                                }}
                                            ></div>

                                        </div>

                                        <p className="progress-text">
                                            {Math.round(progress)}% funded
                                        </p>

                                        {/* BUTTON */}
                                        <Link
                                            to={`/campaign/${campaign._id}`}
                                            className="view-button"
                                        >
                                            View Campaign
                                            <span>→</span>
                                        </Link>

                                    </div>

                                </div>
                            );
                        })
                    )}

                </div>

            </section>

            {/* WHY FUNDRAISE */}
            <section className="why-section">

                <div className="why-heading">

                    <span className="section-label">
                        WHY FUNDRAISE?
                    </span>

                    <h2>
                        Every contribution counts.
                    </h2>

                </div>

                <div className="why-grid">

                    <div className="why-card">
                        <div className="why-icon">
                            💜
                        </div>

                        <h3>
                            Make an Impact
                        </h3>

                        <p>
                            Your support can help turn someone's
                            difficult moment into a hopeful one.
                        </p>
                    </div>

                    <div className="why-card">
                        <div className="why-icon">
                            🔒
                        </div>

                        <h3>
                            Simple & Secure
                        </h3>

                        <p>
                            Every donation is securely recorded
                            and connected to its campaign.
                        </p>
                    </div>

                    <div className="why-card">
                        <div className="why-icon">
                            🌱
                        </div>

                        <h3>
                            Create Change
                        </h3>

                        <p>
                            Small contributions come together
                            to create meaningful change.
                        </p>
                    </div>

                </div>

            </section>

            {/* FOOTER */}
            <footer className="site-footer">

                <div>
                    <span className="footer-logo">
                        ♥ FundRaise
                    </span>

                    <p>
                        Together, we can make a difference.
                    </p>
                </div>

                <span>
                    © 2026 FundRaise
                </span>

            </footer>

        </div>
    );
}

export default CampaignList;