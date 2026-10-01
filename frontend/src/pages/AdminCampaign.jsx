import { useEffect, useState } from "react";
import axios from "axios";

function AdminCampaign() {
    const [campaigns, setCampaigns] = useState([]);

    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [targetAmount, setTargetAmount] = useState("");

    const [editingId, setEditingId] = useState(null);

    const fetchCampaigns = async () => {
        try {
            const response = await axios.get(
                "http://localhost:5001/api/campaigns"
            );

            setCampaigns(response.data);

        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        fetchCampaigns();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const token = localStorage.getItem("token");

        try {
            if (editingId) {

                await axios.put(
                    `http://localhost:5001/api/campaigns/${editingId}`,
                    {
                        title,
                        description,
                        targetAmount: Number(targetAmount)
                    },
                    {
                        headers: {
                            Authorization: `Bearer ${token}`
                        }
                    }
                );

                alert("Campaign updated successfully! ✨");

            } else {

                await axios.post(
                    "http://localhost:5001/api/campaigns",
                    {
                        title,
                        description,
                        targetAmount: Number(targetAmount)
                    },
                    {
                        headers: {
                            Authorization: `Bearer ${token}`
                        }
                    }
                );

                alert("Campaign created successfully! 🎉");
            }

            clearForm();
            fetchCampaigns();

        } catch (error) {
            alert(
                error.response?.data?.message ||
                "Operation failed"
            );
        }
    };

    const handleEdit = (campaign) => {
        setEditingId(campaign._id);

        setTitle(campaign.title);
        setDescription(campaign.description);
        setTargetAmount(campaign.targetAmount);

        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    };

    const handleDelete = async (id) => {
        const token = localStorage.getItem("token");

        const confirmDelete = window.confirm(
            "Are you sure you want to delete this campaign?"
        );

        if (!confirmDelete) {
            return;
        }

        try {
            await axios.delete(
                `http://localhost:5001/api/campaigns/${id}`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );

            alert("Campaign deleted successfully!");

            fetchCampaigns();

        } catch (error) {
            alert(
                error.response?.data?.message ||
                "Delete failed"
            );
        }
    };

    const clearForm = () => {
        setTitle("");
        setDescription("");
        setTargetAmount("");
        setEditingId(null);
    };

    const activeCampaigns = campaigns.filter(
        (campaign) =>
            campaign.status === "active"
    ).length;

    const completedCampaigns = campaigns.filter(
        (campaign) =>
            campaign.status === "completed"
    ).length;

    const totalRaised = campaigns.reduce(
        (total, campaign) =>
            total + campaign.raisedAmount,
        0
    );

    return (
        <div className="admin-page">

            {/* HEADER */}

            <div className="admin-header">

                <div>
                    <span className="admin-tag">
                        ADMIN PANEL
                    </span>

                    <h1>
                        Campaign Dashboard 👑
                    </h1>

                    <p>
                        Create, manage and monitor fundraising
                        campaigns.
                    </p>
                </div>

                <div className="admin-summary">

                    <div>
                        <strong>
                            {campaigns.length}
                        </strong>

                        <span>
                            Total
                        </span>
                    </div>

                    <div>
                        <strong>
                            {activeCampaigns}
                        </strong>

                        <span>
                            Active
                        </span>
                    </div>

                    <div>
                        <strong>
                            {completedCampaigns}
                        </strong>

                        <span>
                            Completed
                        </span>
                    </div>

                </div>

            </div>


            {/* STATS */}

            <div className="admin-stats">

                <div className="admin-stat-card">

                    <div className="admin-stat-icon">
                        📋
                    </div>

                    <div>
                        <span>
                            Total Campaigns
                        </span>

                        <strong>
                            {campaigns.length}
                        </strong>
                    </div>

                </div>


                <div className="admin-stat-card">

                    <div className="admin-stat-icon">
                        💜
                    </div>

                    <div>
                        <span>
                            Active Campaigns
                        </span>

                        <strong>
                            {activeCampaigns}
                        </strong>
                    </div>

                </div>


                <div className="admin-stat-card">

                    <div className="admin-stat-icon">
                        💰
                    </div>

                    <div>
                        <span>
                            Total Raised
                        </span>

                        <strong>
                            ₹{totalRaised}
                        </strong>
                    </div>

                </div>

            </div>


            {/* CREATE / EDIT */}

            <div className="admin-form">

                <div className="admin-form-heading">

                    <div>

                        <span className="section-label">
                            {editingId
                                ? "EDIT CAMPAIGN"
                                : "NEW CAMPAIGN"}
                        </span>

                        <h2>
                            {editingId
                                ? "Update Campaign"
                                : "Create a Campaign"}
                        </h2>

                    </div>

                    {editingId && (
                        <button
                            type="button"
                            className="cancel-btn"
                            onClick={clearForm}
                        >
                            Cancel
                        </button>
                    )}

                </div>


                <form onSubmit={handleSubmit}>

                    <div className="admin-form-field">

                        <label>
                            Campaign Title
                        </label>

                        <input
                            type="text"
                            placeholder="e.g. Education Support"
                            value={title}
                            onChange={(e) =>
                                setTitle(e.target.value)
                            }
                            required
                        />

                    </div>


                    <div className="admin-form-field">

                        <label>
                            Target Amount
                        </label>

                        <div className="admin-amount-input">

                            <span>
                                ₹
                            </span>

                            <input
                                type="number"
                                placeholder="10000"
                                value={targetAmount}
                                onChange={(e) =>
                                    setTargetAmount(
                                        e.target.value
                                    )
                                }
                                min="1"
                                required
                            />

                        </div>

                    </div>


                    <div className="admin-form-field full">

                        <label>
                            Campaign Description
                        </label>

                        <textarea
                            placeholder="Describe what this campaign is raising funds for..."
                            value={description}
                            onChange={(e) =>
                                setDescription(
                                    e.target.value
                                )
                            }
                            required
                        />

                    </div>


                    <div className="admin-form-actions">

                        <button
                            type="submit"
                            className="primary-btn"
                        >
                            {editingId
                                ? "Update Campaign →"
                                : "Create Campaign →"}
                        </button>

                    </div>

                </form>

            </div>


            {/* CAMPAIGNS */}

            <div className="admin-list-header">

                <div>
                    <span className="section-label">
                        MANAGE
                    </span>

                    <h2>
                        All Campaigns
                    </h2>

                    <p>
                        Manage your fundraising campaigns
                        from one place.
                    </p>
                </div>

            </div>


            <div className="admin-campaign-grid">

                {campaigns.length === 0 ? (

                    <div className="admin-empty">

                        <div>
                            📋
                        </div>

                        <h3>
                            No campaigns yet
                        </h3>

                        <p>
                            Create your first campaign above.
                        </p>

                    </div>

                ) : (

                    campaigns.map((campaign) => {

                        const progress = Math.min(
                            (
                                campaign.raisedAmount /
                                campaign.targetAmount
                            ) * 100,
                            100
                        );

                        return (
                            <div
                                className="admin-campaign-card"
                                key={campaign._id}
                            >

                                <div className="admin-card-top">

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


                                <h3>
                                    {campaign.title}
                                </h3>

                                <p className="admin-description">
                                    {campaign.description}
                                </p>


                                <div className="admin-amounts">

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
                                            Goal
                                        </span>

                                        <strong>
                                            ₹
                                            {campaign.targetAmount}
                                        </strong>

                                    </div>

                                </div>


                                <div className="progress-bar">

                                    <div
                                        className="progress"
                                        style={{
                                            width:
                                                `${progress}%`
                                        }}
                                    ></div>

                                </div>

                                <p className="admin-progress-text">
                                    {Math.round(progress)}%
                                    funded
                                </p>


                                <div className="admin-card-buttons">

                                    <button
                                        className="edit-btn"
                                        onClick={() =>
                                            handleEdit(
                                                campaign
                                            )
                                        }
                                    >
                                        ✏️ Edit
                                    </button>

                                    <button
                                        className="delete-btn"
                                        onClick={() =>
                                            handleDelete(
                                                campaign._id
                                            )
                                        }
                                    >
                                        🗑 Delete
                                    </button>

                                </div>

                            </div>
                        );
                    })
                )}

            </div>

        </div>
    );
}

export default AdminCampaign;