<template>
	<div class="row">
		<div class="row">
			<div class="col-sm-12">

				<div class="white-box com-box">

					<div class="row" v-if="successMessage !== ''">
						<div class="alert alert-success">
							{{ successMessage }}
						</div>
					</div>
					<div class="form-group dash-group">
					<div class="row">
						<label class="col-sm-3 pl-2">{{ $t('paymentMethods') }} *</label>
						<div class="col-sm-8">
							<select class="form-control"
							:placeholder="$t('paymentMethods')"
							v-model="form.fav_payment_method"
							:class="{ 'is-invalid': errors.fav_payment_method }"
							>
								<option v-for="method in payments" :key="method"
								:selected="`${method == form.fav_payment_method ? 'selected' : ''}`"
								>
									{{method}}
								</option>
							</select>
						</div>
					</div>
					<div class="row">
						<label class="col-sm-3 pl-2">Payment Number *</label>
						<div class="col-sm-8">
							<input type="text" class="form-control" v-model="form.paymentNumber" required />
						</div>
					</div>
					</div>
					<div class="col-sm-12 text-right mt-40">
						<button class="the-btn hvr-radial-out" @click="handleSubmition">
						{{ $t('Update')}}
						</button>
					</div>
				</div>
			</div>
		</div>
		<div class="row">
			<div class="col-sm-12">
				<div class="col-sm-6 col-md-3">
					<div class="white-box com-box">
						<h3 class="box-title">{{ totalBalance }}</h3>
						<h5>Total Balance</h5>
					</div>
				</div>
				<div class="col-sm-6 col-md-3">
					<div class="white-box com-box">
						<h3 class="box-title">{{ transactions.done }}</h3>
						<h5>Done Transactions</h5>
					</div>
				</div>
				<div class="col-sm-6 col-md-3">
					<div class="white-box com-box">
						<h3 class="box-title">{{ transactions.pending }}</h3>
						<h5>Pending Transactions</h5>
					</div>
				</div>
				<div class="col-sm-6 col-md-3">
					<div class="white-box com-box">
						<h3 class="box-title">{{ transactions.canceled }}</h3>
						<h5>Canceled Transactions</h5>
					</div>
				</div>
			</div>
		</div>
		<div class="row no-mar">
			<div class="col-sm-12">
				<!-- transactions history  -->
				<div class="row">
					<div class="col-xs-12 col-md-10">
						<h3>Transactions History ...</h3>
					</div>
				</div>
				<div class="table-responsive com-table">
					<table class="table table-bordered">
						<thead>
							<tr>
								<th width="10%">No.</th>
								<th width="15%">Date</th>
								<th width="15%">Status</th>								
								<th width="20%">Balance</th>
							</tr>
						</thead>
						<tbody>
							<tr v-for="transaction in transactions.all" :key="transaction.id">
								<td>{{ transaction.transNumber || 'Not Available' }}</td>
								<td>{{ transaction.updated_at || 'Not Available' }}</td>
								<td>
									<span class="label label-danger">{{
										transaction.status
									}}</span>
								</td>								
								<td>
									<strong>{{ transaction.amount }}</strong>
								</td>
							</tr>
						</tbody>
					</table>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	export default {
		data: () => ({
			totalBalance: 0,
			transactions: {
				all: [],
				done: 0,
				pending: 0,
				canceled: 0,
			},
			form: {
				fav_payment_method: '',
				paymentNumber: ''
			},
			successMessage: '',
			payments:['stc','paypal']
		}),

		layout: 'dashboard',

		middleware: 'auth',

		mounted() {
			this.getTransactions()
			this.form = {
				fav_payment_method: this.user.fav_payment_method,
				paymentNumber: this.user.fav_payment_method == 'stc' ? this.user.stcpayno : this.user.paypalno
			}
		},

		methods: {
			getTransactions() {
				let requests = [
					this.$axios.$get('me/balance'),
					this.$axios.$get('me/soldier/transactions'),
				]
				let promises = Promise.all(requests)
				promises.then((res) => {
					this.totalBalance = res[0].data.balance
					this.transactions.all = res[1].data.data
					this.transactions.done = this.filterTransactions(res[1], 'done')
					this.transactions.pending = this.filterTransactions(res[1], 'pending')
					this.transactions.canceled = this.filterTransactions(
						res[1],
						'canceled'
					)
				})
			},
			filterTransactions(response, status) {
				let transactions = response.data.data.filter(
					(transaction) => transaction.status == status
				)
				let transactionsSum = transactions.reduce(
					(total, transaction) => total + transaction.amount,
					0
				)

				return transactionsSum
			},
			handleSubmition() {
				let formData = {
					fav_payment_method: this.form.fav_payment_method,
				}
				if (this.form.fav_payment_method == 'stc') {
					formData.stcpayno = this.form.paymentNumber
				} else {
					formData.paypalno = this.form.paymentNumber
				}
				debugger
				this.$axios.$post("auth/profile/update", formData, {})
					.then((res) => {
						this.successMessage = "Payment Method has been updated.";
						//** update data in store */
						this.user.fav_payment_method = this.form.fav_payment_method
						if (this.form.fav_payment_method == 'stc') {
							this.user.stcpayno = this.form.paymentNumber
							this.user.paypalno = null
						} else {
							this.user.paypalno = this.form.paymentNumber
							this.user.stcpayno = null
						}
						debugger
					});
			},
		},
	}
</script>
