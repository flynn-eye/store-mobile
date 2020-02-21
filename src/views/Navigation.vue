<template>
  <div>
    <NavigationLayout location-title="功能" :show-left="true"/>
    <Grid :column-num="3" :clickable="true" :square="true">
      <GridItem to="/changePassword">
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-bianpinghuatubiaosheji-"></use>
        </svg>
        <p>
          修改密码
        </p>
      </GridItem>
      <GridItem to="windowCustoms">
        <svg class="icon">
          <use xlink:href="#icon-bianpinghuatubiaosheji-1"></use>
        </svg>
        <p>
          窗口报单
        </p>
      </GridItem>
      <GridItem to="myOrder">
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-bianpinghuatubiaosheji-2"></use>
        </svg>
        <p>
          我的订单
        </p>
      </GridItem>
      <GridItem>
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-bianpinghuatubiaosheji-3"></use>
        </svg>
        <p>
          出库
        </p>
      </GridItem>
      <GridItem to="bidding">
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-bianpinghuatubiaosheji-4"></use>
        </svg>
        <p>
          订单竞标
        </p>
      </GridItem>
      <!--<GridItem>-->
        <!--<svg class="icon" aria-hidden="true">-->
          <!--<use xlink:href="#icon-bianpinghuatubiaosheji-5"></use>-->
        <!--</svg>-->
        <!--<p>-->
          <!--举报-->
        <!--</p>-->
      <!--</GridItem>-->
      <GridItem to="myCustom">
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-bianpinghuatubiaosheji-6"></use>
        </svg>
        <p>
          我的报单
        </p>
      </GridItem>
      <GridItem>
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-bianpinghuatubiaosheji-7"></use>
        </svg>
        <p>
         入库
        </p>
      </GridItem>
      <GridItem>
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-bianpinghuatubiaosheji-8"></use>
        </svg>
        <p>
          仓库管理
        </p>
      </GridItem>
    </Grid>
  </div>
</template>

<script>
import { Grid, GridItem } from 'vant';
import '../assets/svg/iconfont';
import NavigationLayout from '../components/layout/NavigationLayout.vue';

export default {
  name: 'Navigation',
  components: {
    NavigationLayout,
    Grid,
    GridItem,
  },
};
</script>

<style lang="less">
@import "../util/common.less";
.icon {
  width: 3em; height: 3em;
  vertical-align: -0.15em;
  fill: currentColor;
  overflow: hidden;
}
p{
  color:@text-color
}
</style>
