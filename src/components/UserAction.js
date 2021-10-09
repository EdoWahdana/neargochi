import React from 'react'
import feed from '../assets/Icons/feed.png'
import rest from '../assets/Icons/rest.png'
import play from '../assets/Icons/play.png'

function UserAction() {
	return (
		<div id="user-actions">
			<ul>
				<li><input id="feed" type="image" src={feed} /></li>
				<li><input id="rest" type="image" src={rest} /></li>
				<li><input id="play" type="image" src={play} /></li>
			</ul>
		</div>
	)
}

export default UserAction