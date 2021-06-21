<template>
  <div>
    <div :class="`alert ${successMessageClass}`" v-if="successMessage">
			{{ successMessage }}
		</div>
    <!-- <div class="row">
        <div class="col-md-offset-9 col-md-3">
          <div class="btn the-btn mr-10 pull-right hvr-radial-out" @click="showModal()">create transaction</div>
        </div>
    </div> -->
    <client-only placeholder="Loading...">
      <v-client-table :data="tableData" :columns="columns" :options="options">
        <template span slot="paymentType" slot-scope="props">
          <span>{{props.row.soldier.fav_payment_method ? props.row.soldier.fav_payment_method : '--'}}</span>
        </template>
        <template span slot="paymentNumber" slot-scope="props">
          <span>{{props.row.soldier.fav_payment_method ? (props.row.soldier.fav_payment_method == 'stc' ? props.row.soldier.stcpayno : props.row.soldier.paypalno) : '--'}}</span>
        </template>
      </v-client-table>
    </client-only>
    <!-- Modal to add transaction to soldier -->
		<div class="modal" id="openTransactionModal"  tabindex="-1" role="dialog">
		<div class="modal-dialog" role="document">
			<div class="modal-content">
			<div class="modal-header">
				<h5 class="modal-title" id="exampleModalLabel">Transaction</h5>
				<button type="button" class="close" data-dismiss="modal" aria-label="Close">
				<span aria-hidden="true">&times;</span>
				</button>
			</div>
			<div class="row">
				<br>
				<div class="col-sm-12">
					<div class="form-group">
						<label class="col-sm-4">Amount: </label>
						<div class="col-sm-8">
							<input type="number" class="form-control" v-model="form.amount" required />
						</div>
					</div>
				</div>
			</div>
			<div class="modal-footer">
				<button type="button" class="btn btn-secondary" data-dismiss="modal">cancel</button>
				<button type="button" class="btn btn-success" @click="saveTrans()">save transaction</button>
			</div>
			</div>
		</div>
		</div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      columns: ["transNumber", "amount", "balance", "status","paymentType", "paymentNumber", "created_at"],
      tableData: [],
      form: {
        soldier_id: this.$route.params.id,
        amount: null        
      }, 
      solider_balance:0,
      successMessage: null,
      successMessageClass: null,
      options: {
        headings: {
          transNumber: this.$t('transNumber'),
          amount: this.$t('amount'),
          balance: this.$t('balance'),
          status: this.$t('status'),
          paymentType: 'paymentType',
          paymentNumber: 'paymentNumber',
          created_at: this.$t('created_at'),
        },
        sortable: ["transNumber", "amount", "balance", "status", "created_at"],
        filterable: ["transNumber", "amount", "balance", "status", "created_at"]
      }
    };
  },
  async asyncData({ app, params }) {
    let response = await app.$axios.$get(`soldier/transactions/${params.id}`)
    console.log('soldier_balance: '+response.data[0].soldier.balance);

    let the_balance = (response.data[0]!=null)? response.data[0].soldier.balance : 0;
    
    return {
      tableData: response.data,
      solider_balance: the_balance
    };
  },
  layout: "dashboard",
  middleware: ["auth", "admin"],
  methods: {
    	showModal () {
        this.form.amount = this.solider_balance
        console.log('amount: '+this.form.amount);
        console.log('amount: '+this.form.solider_balance);

				$('#openTransactionModal').modal('show');
			},
			saveTrans() {
				this.$axios
					.$post(`advertiser/transactions`, this.form)
					.then((res) => {
						this.successMessage = res.data.message
            this.tableData.unshift(res.data.data)
            debugger
            this.successMessageClass = 'alert-success'
						$('#openTransactionModal').modal('hide');
					})
					.catch((err) => {
						if (err.errors)
							alert(err.errors.amount[0])
						else if(err.data) {
							alert(err.data.message)
						}
					})
			},
  }
};
</script>
