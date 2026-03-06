import { GqlUser } from "@/graphql/decorator/user.decorator";
import { IsAuth } from "@/middlewares/auth.middleware";
import { DashboardModel } from "@/models/dashboard.model";
import { UserModel } from "@/models/user.model";
import { DashboardService } from "@/services/dashboard.service";
import { Query, Resolver, UseMiddleware } from "type-graphql";

@Resolver(() => DashboardModel)
@UseMiddleware(IsAuth)
export class DashboardResolver {
	private dashboardService = new DashboardService();

	@Query(() => DashboardModel)
	async dashboard(@GqlUser() user: UserModel): Promise<DashboardModel> {
		return this.dashboardService.getDashboard(user.id);
	}
}
