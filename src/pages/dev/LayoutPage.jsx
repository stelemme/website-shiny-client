// Components imports
import PageComponent from "../../components/General/PageComponent";

export default function LayoutPage() {
  return (
    <>
      <PageComponent
        title="LAYOUTPAGE"
        subtitle="Welcome to the dev layoutpage"
      ></PageComponent>

      <PageComponent
        title="LAYOUTPAGE"
        subtitle="Welcome to the dev layoutpage, widthSnaps = 3"
        widthSnaps={3}
      ></PageComponent>
    </>
  );
}
