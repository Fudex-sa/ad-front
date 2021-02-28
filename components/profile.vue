<template>
  <div class="row">
    <div class="col-md-4 pull-left">
      <img class="img-thumbnail pic" :src=" user.picture" alt="profile_picture" />
    </div>
    <div class="col-md-8">
      <div class="col-md-6 col-sm-6 mt-20">
        <div class="white-box">
          <div class="box-right">
            <div>{{ $t('Email') }}</div>
            <p>{{user.email}}</p>
          </div>
        </div>
      </div>
      <div class="col-md-6 col-sm-6 mt-20">
        <div class="white-box">
          <div class="box-right">
            <div>{{ $t('Username') }}</div>
            <p>{{user.username}}</p>
          </div>
        </div>
      </div>
      <div class="col-md-6 col-sm-6 mt-20">
        <div class="white-box">
          <div class="box-right">
            <div>{{ $t('Address profile') }}</div>
            <p>{{user.address}}</p>
          </div>
        </div>
      </div>
      <div class="col-md-6 col-sm-6 mt-20">
        <div class="white-box">
          <div class="box-right">
            <div>{{ $t('Phone')}}</div>
            <p>{{user.mobile}}</p>
          </div>
        </div>
      </div>
      <div class="col-md-6 col-sm-6 mt-20">
        <div class="white-box">
          <div class="box-right">
            <div>{{ $t('Tasks Level')  }}</div>
            <p>{{user.tasks_lvl}}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {};
</script>