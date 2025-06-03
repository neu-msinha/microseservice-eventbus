import React from "react";
import { useState } from "react";
import axios from "axios";

export default ({ postId }) => {

    const [content, setContent] = useState("");

    const onSubmit = async (event) => {
        event.preventDefault();
        if (!content.trim()) {
            alert("Comment cannot be empty.");
            return;
        }

        try {
            await axios.post(`http://localhost:4001/posts/${postId}/comments`, {
                content
            });

            setContent("");
        } catch (error) {
            console.error("Error submitting comment:", error);
        }
    }

    return (
        <div>
            <form onSubmit={onSubmit}>
                <div className="form-group">
                    <label>New Comment</label>
                    <input
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                        type="text"
                        className="form-control"
                        placeholder="Write a comment..."
                    />
                </div>
                <button className="btn btn-primary">Submit</button>
            </form>
        </div>
    );
}