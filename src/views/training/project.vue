<template>
  <a-card>
    <div class="operator">
      <a-button-group>
        <a-button type="primary" @click="add">
          <a-icon type="plus-circle" />新建
        </a-button>
        <!-- <a-button type="primary">
          <a-icon type="edit" />编辑
        </a-button>-->
        <a-button type="primary" @click="batchRemove">
          <a-icon type="delete" />批量删除
        </a-button>
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
      <span slot="action" slot-scope="{text, record}">
        <a @click="add(record)">编辑</a>
        <a-divider type="vertical" />
        <a-popconfirm placement="right" @confirm="remove(record.id)" title="您确定要删除该条数据?">
          <a href="#">删除</a>
        </a-popconfirm>
      </span>
    </pagination-table>

    <a-drawer
      title="创建项目"
      :width="720"
      :visible="visible"
      :body-style="{ paddingBottom: '80px' }"
      @close="onClose"
    >
      <a-form :form="form" @submit="handleSubmit" layout="vertical">
        <a-form-item label="项目名称">
          <a-input
            v-decorator="[
                  'name',
                  {
                    rules: [{ required: true, message: '项目名称不能为空' },
                    { max: 100, message: '项目名称最大长度为100个字符' }]
                  },
                ]"
          />
        </a-form-item>
        <a-form-item label="简介">
          <a-textarea
            v-decorator="[
                  'summary',
                  {
                    rules: [{ max: 1000, message: '简介最大长度为1000字符' }]
                  },
                ]"
            :rows="5"
          />
        </a-form-item>
        <a-form-item label="备注">
          <a-textarea
            v-decorator="[
                  'remark',
                  {
                    rules: [{ max: 225, message: '备注最大长度为225字符' }]
                  },
                ]"
            :rows="3"
          />
        </a-form-item>
        <a-form-item>
          <a-input type="hidden" v-decorator="['id']" />
        </a-form-item>
        <a-form-item>
          <a-input type="hidden" v-decorator="['parentId']" />
        </a-form-item>
        <a-form-item>
          <a-input type="hidden" v-decorator="['channel']" />
        </a-form-item>
      </a-form>
      <div
        :style="{
          position: 'absolute',
          right: 0,
          bottom: 0,
          width: '100%',
          borderTop: '1px solid #e9e9e9',
          padding: '10px 16px',
          background: '#fff',
          textAlign: 'right',
          zIndex: 1,
        }"
      >
        <a-button :style="{ marginRight: '8px' }" @click="reSet">重置</a-button>
        <a-button :loading="isLoading" type="primary" @click="handleSubmit">保存</a-button>
      </div>
    </a-drawer>
  </a-card>
</template>


<script>
import PaginationTable from "../../components/table/PaginationTable";
import qs from "qs";

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
      loading: true, //加载数据进度
      isLoading: false, //提交数据进度
      columns,
      selectedRows: [],
      params: {
        channel: this.$route.matched.slice(-1)[0].parent.name,
        isCla: false,
        name: "",
        page: 1,
        size: 10
      },
      visible: false,
      model: {
        channel: this.$route.matched.slice(-1)[0].parent.name,
        id: 0,
        parentId: 0
      },
      form: this.$form.createForm(this)
    };
  },
  methods: {
    loadData() {
      this.$axios({
        method: "get",
        url: "edu/api/v1/cla/getpaging",
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
    onClose() {
      this.visible = false;
      this.model = {
        channel: this.$route.matched.slice(-1)[0].parent.name,
        id: 0,
        parentId: 0
      };
      this.form.resetFields();
    },
    reSet() {
      var vm = this;
      setTimeout(() => {
        vm.form.setFieldsValue(vm.model);
      }, 0);
    },
    add(record) {
      if (record.id > 0) {
        this.model = record;
        var vm = this;
        setTimeout(() => {
          vm.form.setFieldsValue(record);
        }, 0);
      } else {
        this.reSet();
      }

      this.visible = true;
    },
    //提交表单
    handleSubmit(e) {
      e.preventDefault();
      this.form.validateFields((err, values) => {
        if (!err) {
          this.isLoading = true;
          values.userId = parseInt(this.$store.state.account.user.id);
          values.tenantId = parseInt(this.$store.state.account.user.tid);
          this.$axios({
            method: "post",
            url: "edu/api/v1/cla/create",
            data: values
          })
            .then(() => {
              this.$message.success("信息保存成功！");
              this.loadData();
            })
            .finally(() => {
              this.isLoading = false;
            });
        }
      });
    },
    remove(id) {
      this.$axios({
        method: "post",
        url: "edu/api/v1/cla/delete/" + id
      }).then(() => {
        this.$message.success("删除成功！");
        this.loadData();
      });
    },
    batchRemove() {
      if (this.selectedRows == [] || this.selectedRows.length == 0) {
        this.$message.info("请选择要删除的数据！");
        return;
      }
      this.$axios({
        method: "post",
        url: "edu/api/v1/cla/delete",
        data: qs.stringify({
          ids: this.selectedRows
        })
      }).then(() => {
        this.$message.success("删除成功！");
        this.loadData();
      });
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