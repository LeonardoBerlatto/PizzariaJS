<template>
	<div class="update-user">
		<div class="editing" v-if="user">
			<h1 class="title">Update user data</h1>
			<input
				type="text"
				v-model="user.name"
				name="name"
				placeholder="Name"
			/>
			<input
				type="text"
				v-model="user.email"
				name="email"
				placeholder="Email"
			/>
			<input
				type="text"
				v-model="user.userType"
				name="userType"
				placeholder="User Type"
			/>

			<div class="actions">
				<b-button
					@click="updateUser()"
					class="mr-2"
					variant="success"
					>Update</b-button
				>
				<b-button @click="deleteUser(user.id)" variant="danger"
					>Delete</b-button
				>
			</div>
		</div>
		<div v-else>
			<h1 class="sorry">Sorry, this user doesn't exists :(</h1>
		</div>
	</div>
</template>

<script>
import { getUserById, updateUser, deleteUser } from '../services/user.js'

export default {
	data() {
		return {
			user: null
		}
	},
	methods: {
		deleteUser() {
			deleteUser(this.user.id).then(() => this.$router.push('/users'));
		},
		updateUser() {
			updateUser(this.user.id, this.user).then(() => this.$router.push('/users'));
		}
	},
	created() {
		getUserById(this.$route.params.id).then(res => this.user=res.data);
	}
}
</script>

<style lang="scss">
	$main-green: #41b883;
	$secondary-green: #4fc08d;
	$ripple-green: #08903e;

	@mixin transition($property) {
		-webkit-transition: $property;
		transition: $property;
	}

	.update-user {
		margin-top: 3.6rem;
		width: 100%;
		height: 100%;
		display: flex;
		align-items: center;
		justify-content: center;

		.sorry {
			color: #5f5f5f;
		}

		.editing {
			width: 100%;
			height: 100%;
			display: flex;
			flex-direction: column;
			align-items: center;
			justify-content: center;

			.title {
				color: $main-green;
				margin-bottom: 20px;
			}

			input {
				border: none;
				outline: none;
				color: #212121;
				padding: 5px 2px 0 2px;
				font-size: 18px;
				background-color: transparent;
				border-bottom: 1px solid #a9a9a9;
				margin-bottom: 30px;
				width: 15%;
				min-width: 190px;
				max-width: 290px;
				text-align: center;
				@include transition((border-bottom, width 0.3s ease));
				&:focus {
					border-bottom: 1px solid #4fc08d;
					max-width: 290px;
					width: 25%;
				}
				&:-webkit-autofill,
				&:-webkit-autofill:hover,
				&:-webkit-autofill:focus,
				&:-webkit-autofill:active {
					box-shadow: 0 0 0 30px white inset;
				}
			}
		}
	}
</style>
