// mui imports
import QuizIcon from "@mui/icons-material/Quiz";

// Components imports
import PageComponent from "../../components/General/PageComponent";
import UserSelect from "../../components/Selects/UserSelect";

export default function LayoutPage() {
  return (
    <>
      <PageComponent
        title="LAYOUTPAGE"
        subtitle="Welcome to the dev layoutpage"
      />

      <PageComponent
        title="LAYOUTPAGE"
        subtitle="Welcome to the dev layoutpage, widthSnaps = 3"
        widthSnaps={3}
      />

      <PageComponent
        title="LAYOUTPAGE"
        subtitle="Welcome to the dev layoutpage, with icons"
        icon1={<QuizIcon />}
        icon2={<QuizIcon />}
      />

      <PageComponent
        title="LAYOUTPAGE"
        subtitle="Welcome to the dev layoutpage, with select"
        select={<UserSelect label={"User"} fullWidth />}
      />

      <PageComponent
        title="LAYOUTPAGE"
        subtitle="Welcome to the dev layoutpage, with icons & select"
        icon1={<QuizIcon />}
        icon2={<QuizIcon />}
        select={<UserSelect label={"User"} fullWidth />}
      />
    </>
  );
}
