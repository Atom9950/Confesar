document.querySelectorAll(".post").forEach(post => {
	const postId = post.dataset.postId;
	const ratings = post.querySelectorAll(".post-rating");
	const likeRating = ratings[0];

	ratings.forEach(rating => {
		const button = rating.querySelector(".post-rating-button");
		const count = rating.querySelector(".post-rating-count");

		button.addEventListener("click", async () => {
			if (rating.classList.contains("post-rating-selected")) {
				return;
			}

			count.textContent = Number(count.textContent) + 1;

			ratings.forEach(rating => {
				if (rating.classList.contains("post-rating-selected")) {
					const count = rating.querySelector(".post-rating-count");

					count.textContent = Math.max(0, Number(count.textContent) - 1);
					rating.classList.remove("post-rating-selected");
				}
			});

			rating.classList.add("post-rating-selected");

			const likeOrDislike = likeRating === rating ? "like" : "dislike";
			const response = await fetch(`/posts/${postId}/${likeOrDislike}`);
			const body = await response.json();
		});
	});
});



// comment

document.addEventListener('DOMContentLoaded', function() {
    const commentForm = document.getElementById('comment-form');
    const commentList = document.getElementById('comments-list');
    let userId = 1; // Starting user ID

    commentForm.addEventListener('submit', function(event) {
        event.preventDefault();

        const commentInput = document.getElementById('comment-input');
        const commentText = commentInput.value.trim();

        if (commentText !== '') {
            addComment(commentText, userId);
            commentInput.value = '';
            userId++; // Increment user ID for next comment
        }
    });

    function addComment(commentText, userId) {
        const commentItem = document.createElement('li');
        commentItem.classList.add('comment');
        commentItem.innerHTML = `
            <span class="user-id">User ${userId}:</span>
            <div class="comment-text">${commentText}</div>
            <div class="comment-actions">
                <button class="delete-btn">Delete</button>
            </div>
            <ul class="replies-list"></ul>
        `;
        commentList.appendChild(commentItem);
        const deleteBtn = commentItem.querySelector('.delete-btn');
        deleteBtn.addEventListener('click', function() {
            commentItem.remove();
        });
    }
});


