<template>
  <div class="col-md-12">
    <!-- Success Message -->
    <div :class="`alert ${successMessage_bg}`" v-if="successMessage">{{ successMessage }}</div>
    <!-- Create New Ad Component -->
    <div class="div-top">
      <nuxt-link
        :to="localePath('advertiser-dashboard-ads-new')"
        class="the-btn hvr-radial-out"
        v-if="role == 'advertiser'"
      >{{ $t('create_new') }}</nuxt-link>
      <br><br><br>
      <div class="the-search">
        <form>
          <div class="input-group">
            <input type="text" class="form-control" placeholder="Search" />
            <div class="input-group-btn">
              <button class="btn btn-default" type="submit">
                <img src="img/search.png" />
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
    <!-- table -->
    <div class="table-responsive">
      <table class="table">
        <thead>
          <tr>
            <th scope="col" class="col-xs-1 col-sm-2">{{ $t('ads.title') }} </th>
            <th scope="col" class="col-xs-2 col-md-5">{{ $t('ads.description') }}</th>
            <th scope="col" class="col-sm-2">{{ $t('ads.campaign') }}</th>
            <th scope="col" class="col-sm-1" v-if="user.role != 'soldier'">{{ $t('ads.clicks') }}</th>
            <th scope="col" class="col-sm-1" v-if="user.role != 'soldier'">{{ $t('ads.status')}}</th>
            <th scope="col" class="col-sm-1" v-if="user.role != 'soldier'">{{ $t('ads.budget') }}</th>
            <th scope="col" class="col-sm-1">{{ $t('ads.start_at') }}</th>
            
            <th scope="col" class="col-sm-1">{{ $t('ads.created') }}</th>
            <th scope="col" class="hidden-sm">{{ $t('ads.actions') }}</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(ad, index) in ads.data" :key="ad.id">
            <td class="col-xs-1 col-sm-2">
            {{ ad.title }}
            </td>
            <td class="col-xs-2 col-md-5 text-break">{{ ad.content }}</td>
            <td class="col-sm-2">{{ ad.campaign != null ? ad.campaign.title : "--" }}</td>
            <td class="col-sm-2" v-if="user.role != 'soldier'">{{ ad.clicks || 0 }}</td>

            <td class="col-sm-1" v-if="user.role != 'soldier' && ad.status == 'active'">{{ status(ad.end_date) }}</td>
            <td v-else-if="user.role != 'soldier'">{{ ad.status }}</td>
            <td v-if="user.role != 'soldier'">{{ ad.budget }} SAR</td>
            <td>{{ ad.start_date }}</td>
   
            <td>
              {{ ad.created_at }}
              <!-- {{ ad}} -->
            </td>

            <td class="hidden-sm">
              <!-- Action Buttons -->
              <div class="text-center">
                <template v-if="user.role == 'advertiser' && ! ['finished', 'active'].includes(ad.status) " >
                  <!-- Edit -->
                  <nuxt-link
                    :to="localePath({name: 'advertiser-dashboard-ads-id-edit', params: { id: ad.id }})"
                    class="btn btn-info action-btn"
                  >{{ $t('ads.action.edit') }}</nuxt-link>
                </template>
                <!-- Preview as visitor -->
                <template v-if="user.role == 'advertiser'" >
                <nuxt-link 
                  class="btn btn-info action-btn"
                  :to="localePath(`/${user.role}/dashboard/ads/${ad.id}`)"
                >{{ $t('ads.action.view') }}</nuxt-link>
                </template>
                <template v-if="user.role != 'advertiser'" >
                <nuxt-link
                  v-if="user.role == 'admin'"
                  class="btn btn-info action-btn"
                  :to="localePath(`/${user.role}/dashboard/ads/single/${ad.id}`)"
                >{{ $t('ads.action.view') }}</nuxt-link>
                <nuxt-link
                  v-else
                  class="btn btn-info action-btn"
                  :to="localePath(`/${user.role}/dashboard/ads/${ad.id}`)"
                >{{ $t('ads.action.view') }}</nuxt-link>
                </template>
                <!-- Reviewing -->
                <button
                  class="btn btn-success action-btn"
                  @click="activateAd(ad.id)"
                  v-if="user.role === 'admin' && ad.status == 'reviewing'"
                >Approve</button>
                <!-- Statistics -->
                <nuxt-link
                  class="btn action-btn btn-primary"

                   :to="localePath({name: 'advertiser-dashboard-ads-id-statistics', params: { id: ad.id }})"
                  
                  v-if="user.role != 'soldier' && ['finished', 'active'].includes(ad.status)"
                >{{ $t('ads.action.statistics') }}</nuxt-link>
                <button
                  v-if="user.role != 'soldier'"
                  class="fa fa-trash-o fa-lg btn btn-danger action-btn"
                  @click="deleteAd(ad.id, index)"
                ></button>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- pagination -->
    <nav class="text-center">
      <ul class="pagination">
        <!-- prev -->
        <li :class="{ disabled: this.prev_page_url == null }">
          <a @click="prev">
            <i class="fa fa-backward"></i>
          </a>
        </li>
        <!-- pages buttons -->
        <li class="disabled">
          <a>..</a>
        </li>
        <li v-if="ads.links.current_page != 1">
          <a @click.prevent="prev">{{ ads.links.current_page - 1 }}</a>
        </li>
        <li class="active">
          <a>
            {{ ads.links.current_page }}
            <span class="sr-only">(current)</span>
          </a>
        </li>

        <li v-if="ads.links.current_page != ads.links.last_page">
          <a @click.prevent="next">{{ ads.links.current_page + 1 }}</a>
        </li>
        <li class="disabled">
          <a>..</a>
        </li>
        <!-- next -->
        <li :class="{ disabled: this.next_page_url == null }">
          <a @click.prevent="next" :class="{ disabled: this.next_page_url == null }">
            <i class="fa fa-forward"></i>
          </a>
        </li>
      </ul>
    </nav>
    <!-- pagination -->
    <!-- end table -->
  </div>
</template>

<script>
export default {
  scrollToTop: true,
  props: {
    initialAds: {
      type: Object
    }
  },

  data() {
    return {
      successMessage: "",
      successMessage_bg: "",
      ads: this.initialAds,
      next_link: "",
      prev_link: null
    };
  },
  computed: {
    status: function() {
      return function(end_date) {
        let currentDate = new Date();
        let formattedDate =
          currentDate.getDate() +
          "-" +
          currentDate.getMonth() +
          "-" +
          currentDate.getFullYear();

        if (end_date >= formattedDate) {
          return "Finished";
        }
        return "Active";
      };
    }
  },
  mounted() {
    let currentAd = this.ads.data.filter(ad => ad.id === 2);
  },
  methods: {
    activateAd(id) {
      this.$axios
        .$post(`ads/${id}/activate`)
        .then(res => {
          this.successMessage = res.data.message;
          this.successMessage_bg = "alert-success";
          this.ads.data.map(ad => {
            ad.id === id ? (ad.status = "active") : "";
            return ad;
          });
        })
        .catch(err => {
          this.successMessage = err.data.message;
        });
    },
    deleteAd(adId, index) {
      this.$axios
        .$delete(`ads/${adId}`)
        .then(res => {
          // print success message
          this.successMessage = res.data.message;
          this.successMessage_bg = "alert-danger";
          // remove from the client side immediately
          this.ads.data.splice(index, 1);
          // hide success message after timer
          setTimeout(() => {
            this.successMessage = "";
          }, 1200);
        })
        .catch(err => {
          this.successMessage = err.data.message;
        });
    },
    next() {
      if (this.ads.links.next_page_url != null) {
        this.$axios
          .$get(`${this.ads.links.next_page_url}`)
          .then(res => {
            (this.ads = res.data),
              (this.next_link = this.ads.links.next_page_url);
            this.prev_link = this.ads.links.prev_page_url;

            this.$store.commit(
              "localStorage/SET_CURRENT_PAGE_PAGINATION",
              res.data.links.current_page
            );
            debugger
          })
          .catch(err => {
            $nuxt.error({
              statusCode: err.status,
              message: err.message
            });
          });
      }
    },
    prev() {
      if (this.ads.links.prev_page_url != null) {
        this.$axios
          .$get(`${this.ads.links.prev_page_url}`)
          .then(res => {
            (this.ads = res.data),
              (this.next_link = this.ads.links.next_page_url);
            this.prev_link = this.ads.links.prev_page_url;
            this.$store.commit(
              "localStorage/SET_CURRENT_PAGE_PAGINATION",
              res.data.links.current_page
            );
            debugger
          })
          .catch(err => {
            $nuxt.error({
              statusCode: err.status,
              message: err.message
            });
          });
      }
    }
  }
};
</script>
