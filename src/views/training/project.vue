<template>
  <a-card>
    <div class="operator">
      <a-button-group>
        <a-button type="primary" @click="getSelected">
          <a-icon type="plus-circle" />新建
        </a-button>
        <!-- <a-button type="primary">
          <a-icon type="edit" />编辑
        </a-button>
        <a-button type="primary">
          <a-icon type="delete" />删除
        </a-button>-->
      </a-button-group>

      <a-input-search
        enter-button
        style="float:right;margin-left: 16px; width: 272px;"
        placeholder="请输入名称"
        @search="onSearch"
      />
    </div>
    <pagination-table
      :columns="columns"
      :data-source="data"
      :loading="loading"
      @selected="onSelected"
      @change="onChange"
    >
      <template>
        <span slot="action">
          <a>编辑</a>
          <a-divider type="vertical" />
          <a-popconfirm placement="right" title="您确定要删除该条数据?">
            <a href="#">删除</a>
          </a-popconfirm>
        </span>
      </template>
    </pagination-table>
  </a-card>
</template>


<script>
import PaginationTable from "../../components/table/PaginationTable";

const columns = [
  {
    title: "名称",
    dataIndex: "name",
    width: "50%"
  },
  {
    title: "备注",
    dataIndex: "remark"
  },
  {
    title: "操作",
    key: "action",
    scopedSlots: { customRender: "action" },
    width: "110px"
  }
];

export default {
  components: { PaginationTable },
  data() {
    return {
      data: {
        // currentPage: 1,
        // pageSize: 10
      },
      loading: true,
      columns,
      selectedRows: [],
      params: {
        channel: "training",
        isCla: false,
        name: "",
        page: 1,
        size: 10
      }
    };
  },
  methods: {
    loadData() {
      this.$axios({
        methods: "get",
        url: "edu/api/v1/cla/getall",
        params: this.params
      })
        .then(json => {
          this.data = json;
        })
        .finally(() => {
          this.loading = false;
        });
    },
    onSelected(rows) {
      this.selectedRows = rows;
    },
    onChange(paging) {
      Object.assign(this.params, paging);
      // this.params=params;
      this.loadData();
    },
    onSearch(val) {
      Object.assign(this.params, { name: val, page: 1 });
      this.loadData();
    },
    getSelected() {
      console.log(this.selectedRows.join(","));
    }
  },
  mounted() {
    this.loadData();
  }
};
</script>

<style lang="less" scoped>
.ant-form-item {
  margin-bottom: 18px;
}
</style>