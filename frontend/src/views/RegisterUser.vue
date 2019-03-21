<template>
	<div class="register">
		<h1>Register new user</h1>
		<input type="text" v-model="user.name" name="name" placeholder="Name" />
		<input
			type="email"
			v-model="user.email"
			name="email"
			placeholder="Email"
		/>
		<b-form-group label="Individual radios">
			<b-form-radio
				v-for="type in userTypes"
				:key="type"
				:value="type"
				v-model="user.userType"
				name="some-radios"
			>
				{{ type }}
			</b-form-radio>
		</b-form-group>
		<input
			type="password"
			v-model="user.password"
			name="password"
			placeholder="Password"
		/>
		<transition enter-active-class="animated slideInLeft" mode="out-in">
			<div class="message" v-if="msg">
				<span :class="error ? 'error' : 'success'">
					{{ msg }}
				</span>
			</div>
		</transition>

		<button class="btn-submit ripple" @click="create(user)">
			Register
		</button>
	</div>
</template>

<script>
import { createUser } from '../services/user.js';

export default {
	data() {
		return {
			error: false,
			msg: '',
			user: {
				name: "",
				email: "",
				userType: "",
				password: ""
			},
			userTypes: ['Admin', 'Owner', 'Simple']
		}
	},
	methods: {
		create(user) {
			createUser(user)
				.then(res => this.created(res.data))
				.catch(error => this.failed(error.response));
			console.log();
		},
		created(user) {
			this.error=false;
			this.msg=`User ${user.name} was created!`;
		},
		failed(res) {
			this.error=true;
			this.msg=res.data;
		}
	},
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

	.register {
		background-color: #fff;
		margin-top: 3.6rem;
		width: 100%;
		height: 100%;
		display: flex;
		align-items: center;
		justify-content: center;
		flex-direction: column;

		& > h1 {
			color: $main-green;
			margin-top: 0;
			margin-bottom: 42px;
		}

		input {
			border: none;
			outline: none;
			color: #212121;
			padding: 5px 2px 0 2px;
			font-size: 18px;
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

		.message {
			margin-bottom: 30px;
			font-weight: bold;

			.error {
				color: #f44336;
			}

			.success {
				color: $secondary-green;
			}
		}

		.btn-submit {
			outline: none;
			border: none;
			background-color: $main-green;
			color: #fff;
			cursor: pointer;
			line-height: 20px;
			font-size: 20px;
			padding: 0.6rem 1rem;
			border-radius: 20px;
		}

		.ripple {
			background-position: center;
			@include transition(background 0.5s);

			&:hover {
				background: $ripple-green
					radial-gradient(circle, transparent 1%, $ripple-green 1%)
					center/15000%;
			}
			&:active {
				background-color: $secondary-green;
				background-size: 100%;
				@include transition(background 0s);
			}
		}
	}
</style>
