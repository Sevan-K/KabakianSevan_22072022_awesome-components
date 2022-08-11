import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

const routes: Routes = [
    {
        path: "reactive-state",
        loadChildren: () =>
            import("./reactive-state/reactive-state.module").then(
                (module) => module.ReactiveStateModule
            ),
    },
    {
        path: "social-media",
        loadChildren: () =>
            import("./social-media/social-media.module").then(
                (module) => module.SocialMediaModule
            ),
    },
    {
        path: "complex-form",
        loadChildren: () =>
            import("./complex-form/complex-form.module").then(
                (module) => module.ComplexFormModule
            ),
    },
    // ** : if a route is not recognize
    { path: "**", redirectTo: "social-media" },
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
})
export class AppRoutingModule {}
