import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";

function CampaignDetails() {
    const { id } = useParams();

    const [campaign, setCampaign] = useState(null);
    const [amount, setAmount] = useState("");
    const [donations, setDonations] = useState([]);

    const fetchCampaign = async () => {
        try {
            const response = await axios.get(
                `http://localhost:5001/api/campaigns/${id}`
            );

            setCampaign(response.data);
        } catch (error) {
            console.log(error);
        }
    };

    const fetchDonations = async () => {
        try {
            const response = await axios.get(
                `http://localhost:5001/api/campaigns/${id}/donations`
            );

            setDonations(response.data);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        fetchCampaign();
        fetchDonations();
    }, [id]);

    const handleDonate = async (e) => {
        e.preventDefault();

        const token = localStorage.getItem("token");

        if (!token) {
            alert("Please login before donating.");
            return;
        }

        try {
            const response = await axios.post(
                `http://localhost:5001/api/campaigns/${id}/donate`,
                {
                    amount: Number(amount)
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );

            alert("Donation successful! 💜");

            setCampaign(response.data.campaign);
            setAmount("");

            fetchDonations();

        } catch (error) {
            alert(
                error.response?.data?.message ||
                "Donation failed"
            );
        }
    };

    // Loading
    if (!campaign) {
        return (
            <div className="loading">
                <div className="loading-heart">
                    ♥
                </div>

                <h2>
                    Loading campaign...
                </h2>

                <p>
                    Getting the campaign details.
                </p>
            </div>
        );
    }

    // Progress percentage
    const progress = Math.min(
        (campaign.raisedAmount /
            campaign.targetAmount) *
            100,
        100
    );

    // Remaining amount
    const remainingAmount = Math.max(
        campaign.targetAmount -
            campaign.raisedAmount,
        0
    );

    // Campaign image
    const getCampaignImage = (title) => {
        const name = title.toLowerCase();

        if (
            name.includes("education") ||
            name.includes("student") ||
            name.includes("school")
        ) {
            return "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?auto=format&fit=crop&w=1200&q=80";
        }

        if (
            name.includes("medical") ||
            name.includes("health") ||
            name.includes("hospital")
        ) {
            return "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=1200&q=80";
        }

        if (
            name.includes("animal") ||
            name.includes("pet")
        ) {
            return "https://images.unsplash.com/photo-1450778869180-41d0601e046e?auto=format&fit=crop&w=1200&q=80";
        }

        if (
            name.includes("food") ||
            name.includes("hunger")
        ) {
            return "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?auto=format&fit=crop&w=1200&q=80";
        }

        if (
            name.includes("flood") ||
            name.includes("disaster") ||
            name.includes("relief")
        ) {
            return "https://images.unsplash.com/photo-1469571486292-0ba58a3f068b?auto=format&fit=crop&w=1200&q=80";
        }

        return "https://images.unsplash.com/photo-1469571486292-0ba58a3f068b?auto=format&fit=crop&w=1200&q=80";
    };

    return (
        <div className="details-page">

            {/* BACK LINK */}
            <div className="details-topbar">
                <Link to="/" className="back-link">
                    ← Back to campaigns
                </Link>
            </div>

            {/* CAMPAIGN HERO */}
            <section className="details-hero">

                <div className="details-hero-image">

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

                <div className="details-hero-content">

                    <span className="section-label">
                        FUNDRAISING CAMPAIGN
                    </span>

                    <h1>
                        {campaign.title}
                    </h1>

                    <p>
                        {campaign.description}
                    </p>

                </div>

            </section>

            {/* MAIN CONTENT */}
            <div className="details-layout">

                {/* LEFT SIDE */}
                <div className="details-main">

                    {/* PROGRESS CARD */}
                    <div className="progress-card">

                        <div className="details-card-heading">

                            <div>
                                <span>
                                    Campaign Progress
                                </span>

                                <h2>
                                    {Math.round(
                                        progress
                                    )}% funded
                                </h2>
                            </div>

                            <div className="goal-badge">
                                Goal ₹
                                {campaign.targetAmount}
                            </div>

                        </div>

                        <div className="progress-bar large">

                            <div
                                className="progress"
                                style={{
                                    width: `${progress}%`
                                }}
                            ></div>

                        </div>

                        <div className="progress-details">

                            <div>
                                <span>
                                    Raised
                                </span>

                                <strong>
                                    ₹
                                    {campaign.raisedAmount}
                                </strong>
                            </div>

                            <div>
                                <span>
                                    Remaining
                                </span>

                                <strong>
                                    ₹
                                    {remainingAmount}
                                </strong>
                            </div>

                        </div>

                    </div>

                    {/* DONATION HISTORY */}
                    <div className="history-card">

                        <div className="history-heading">

                            <div>
                                <span className="section-label">
                                    TRANSPARENCY
                                </span>

                                <h2>
                                    Donation History
                                </h2>
                            </div>

                            <span className="history-count">
                                {donations.length} donations
                            </span>

                        </div>

                        {donations.length === 0 ? (

                            <div className="no-donations">

                                <div className="no-donation-icon">
                                    💜
                                </div>

                                <h3>
                                    Be the first supporter
                                </h3>

                                <p>
                                    This campaign hasn't received
                                    any donations yet.
                                </p>

                            </div>

                        ) : (

                            <div className="donation-list">

                                {donations.map(
                                    (donation) => (
                                        <div
                                            className="donation-item"
                                            key={
                                                donation._id
                                            }
                                        >

                                            <div className="donor-info">

                                                <div className="donor-avatar">
                                                    {(
                                                        donation
                                                            .user
                                                            ?.name ||
                                                        "A"
                                                    )
                                                        .charAt(0)
                                                        .toUpperCase()}
                                                </div>

                                                <div>
                                                    <strong>
                                                        {
                                                            donation
                                                                .user
                                                                ?.name ||
                                                            "Anonymous"
                                                        }
                                                    </strong>

                                                    <span>
                                                        {new Date(
                                                            donation.createdAt
                                                        ).toLocaleDateString()}
                                                    </span>
                                                </div>

                                            </div>

                                            <strong className="donation-amount">
                                                ₹
                                                {
                                                    donation.amount
                                                }
                                            </strong>

                                        </div>
                                    )
                                )}

                            </div>
                        )}

                    </div>

                </div>

                {/* RIGHT SIDE */}
                <aside className="donation-card">

                    {campaign.status ===
                    "active" ? (

                        <>

                            <div className="donation-card-icon">
                                💜
                            </div>

                            <span className="section-label">
                                SUPPORT THIS CAUSE
                            </span>

                            <h2>
                                Make a difference
                            </h2>

                            <p>
                                Your contribution can help
                                this campaign reach its goal.
                            </p>

                            <div className="remaining-box">

                                <span>
                                    Still needed
                                </span>

                                <strong>
                                    ₹
                                    {remainingAmount}
                                </strong>

                            </div>

                            <form
                                onSubmit={
                                    handleDonate
                                }
                            >

                                <label>
                                    Donation Amount
                                </label>

                                <div className="donation-input">

                                    <span>
                                        ₹
                                    </span>

                                    <input
                                        type="number"
                                        placeholder="Enter amount"
                                        value={amount}
                                        onChange={(e) =>
                                            setAmount(
                                                e.target.value
                                            )
                                        }
                                        min="1"
                                        max={
                                            remainingAmount
                                        }
                                        required
                                    />

                                </div>

                                <button
                                    type="submit"
                                    className="donate-button"
                                >
                                    Donate Now
                                    <span>→</span>
                                </button>

                            </form>

                            <div className="secure-note">
                                🔒 Securely recorded donation
                            </div>

                        </>

                    ) : (

                        <div className="completed-box">

                            <div className="completed-icon">
                                🎉
                            </div>

                            <span className="section-label">
                                GOAL REACHED
                            </span>

                            <h2>
                                Campaign Completed!
                            </h2>

                            <p>
                                This campaign has successfully
                                reached its fundraising goal.
                            </p>

                            <div className="completed-total">
                                ₹
                                {campaign.raisedAmount}
                                <span>
                                    raised
                                </span>
                            </div>

                        </div>

                    )}

                </aside>

            </div>

        </div>
    );
}

export default CampaignDetails;