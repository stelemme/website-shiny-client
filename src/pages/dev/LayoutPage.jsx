// mui imports
import QuizIcon from "@mui/icons-material/Quiz";

// Components imports
import PageComponent from "../../components/General/PageComponent";
import LoadingComponent from "../../components/General/LoadingComponent";
import UserSelect from "../../components/Selects/UserSelect";

export default function LayoutPage() {
  return (
    <>
      <PageComponent
        title="LAYOUTPAGE"
        subtitle="Welcome to the dev layoutpage"
        tabs
      />

      <PageComponent
        title="LAYOUTPAGE"
        subtitle="Welcome to the dev layoutpage, with icons"
        icon1={<QuizIcon />}
        icon2={<QuizIcon />}
        tabs
      />

      <PageComponent
        title="LAYOUTPAGE"
        subtitle="Welcome to the dev layoutpage, with select"
        select={<UserSelect fullWidth />}
        tabs
      />

      <PageComponent
        title="LAYOUTPAGE"
        subtitle="Welcome to the dev layoutpage, with icons & select"
        icon1={<QuizIcon />}
        icon2={<QuizIcon />}
        select={<UserSelect fullWidth />}
        tabs
      />

      <PageComponent
        title="LAYOUTPAGE"
        subtitle="Welcome to the dev layoutpage, loading"
        tabs
      >
        <LoadingComponent loadingCondition={true}></LoadingComponent>
      </PageComponent>
    </>
  );
}
